import ArcadeSprite from "../ArcadeSprite";
import Phaser from "phaser";
import states from "./states";

const bubbleOffsets = {
  thought: {
    bubble: 38,
    item: 46,
  },
  speech: {
    bubble: 40,
    item: 44,
  },
  exclamation: {
    bubble: 38,
    item: 38,
  },
};

class Character extends ArcadeSprite {
  static createAnimations(scene) {
    const { name } = this;
    const dirFrames = {
      down: 0,
      up: 1,
      left: 2,
      right: 3,
    };

    for (const [dir, frame] of Object.entries(dirFrames)) {
      scene.anims.create({
        key: `${name}.idle.${dir}`,
        frames: [
          {
            key: name,
            frame,
          },
        ],
      });

      const frames = [4, 8, 12];

      scene.anims.create({
        key: `${name}.walk.${dir}`,
        frames: frames.map((f) => ({
          key: name,
          frame: f + frame,
        })),
        yoyo: true,
        repeat: -1,
        frameRate: 6,
      });
    }
  }

  get velocity() {
    return {
      x: 80,
      y: 80,
    };
  }

  constructor(scene) {
    super(scene, states);

    this.setPushable(false);

    const bubbles = {};

    for (const type of ["thought", "speech", "exclamation"]) {
      const bubble = scene.add.image(0, 0, `${type}_bubble`);

      bubble.setAlpha(0);
      scene.disableObject(bubble);
      bubbles[type] = bubble;
    }

    this.data.set({
      bubbles,
      bubbleItems: {},
      controls: {},
      prevEffect: {},
      velocity: {},
    });
  }

  update(...params) {
    const { values } = this.data;
    const { controls, collided, onIce, onLadder, onSlope, velocity } = values;

    let { x, y } = this.velocity;
    const dirPressed = Object.values(controls).includes(true);
    const movingFromSnowball = collided && dirPressed;
    const gliding = onIce && !movingFromSnowball;

    if (gliding) {
      values.controls = { left: false, right: false, up: false, down: false };
      values._controls = controls;
    } else if (onSlope) {
      x *= 0.6;
      y *= 0.6;
    } else if (onLadder) {
      x *= 0.3;
      y *= 0.3;
    }

    if (onIce && collided) {
      x = 0;
      y = 0;
    }

    Object.assign(velocity, { x, y });

    super.update(...params);

    if (onIce) {
      values.controls = values._controls;
      values._controls = values.controls;

      const { name } = values.machine.currentState;
      if (name.endsWith("left")) {
        this.setVelocityX(-x).setVelocityY(0);
      } else if (name.endsWith("right")) {
        this.setVelocityX(x).setVelocityY(0);
      } else if (name.endsWith("up")) {
        this.setVelocityX(0).setVelocityY(-y);
      } else if (name.endsWith("down")) {
        this.setVelocityX(0).setVelocityY(y);
      }
    }

    values.prevEffect = {
      onIce,
    };

    values.onSlope = false;
    values.onLadder = false;
    values.onIce = false;
    values.onNonSnow = false;
    values.collided = false;

    for (const [type, bubble] of Object.entries(values.bubbles)) {
      if (bubble.active) {
        this.positionBubbleAndItem(type);
      }
    }
  }

  collide(other) {
    const { values } = this.data;

    if (!values.prevEffect.onIce) {
      this.adjustAroundEdges(other);
    }

    values.collided = true;
  }

  adjustAroundEdges(other) {
    const { machine, controls } = this.data.values;
    const dir = machine.currentState.name.replace("walk.", "");
    const { body } = this;
    const { center, halfWidth, halfHeight, velocity } = body;
    let { x, y } = center;
    const width = 1;
    const height = 1;
    const newVelocity = { x: velocity.x, y: velocity.y };

    const otherCenter =
      other instanceof Phaser.Tilemaps.Tile
        ? { x: other.getCenterX(), y: other.getCenterY() }
        : other.body.center;

    if (!controls.left && !controls.right) {
      const yOffset = halfHeight + 1;
      const newVelocityX = this.velocity.x;

      if (dir === "up" && body.blocked.up) {
        y -= yOffset;
      } else if (dir === "down" && body.blocked.down) {
        y += yOffset;
      } else {
        return;
      }

      if (otherCenter.x < x) {
        x += 1;
        newVelocity.x = newVelocityX;
      } else if (otherCenter.x > x) {
        x -= 1;
        newVelocity.x = -newVelocityX;
      } else {
        return;
      }
    } else if (!controls.up && !controls.down) {
      const xOffset = halfWidth + 1;
      const newVelocityY = this.velocity.y;

      if (dir === "left" && body.blocked.left) {
        x -= xOffset;
      } else if (dir === "right" && body.blocked.right) {
        x += xOffset;
      } else {
        return;
      }

      if (otherCenter.y < y) {
        y += 1;
        newVelocity.y = newVelocityY;
      } else if (otherCenter.y > y) {
        y -= 1;
        newVelocity.y = -newVelocityY;
      } else {
        return;
      }
    }

    const { depth } = this.parentContainer;
    const bodies = this.scene.physics.overlapRect(
      x,
      y,
      width,
      height,
      true,
      true
    );
    let atEdge = true;

    if (bodies.length > 0) {
      const filteredBodies = bodies.filter((body) => {
        const { gameObject } = body;
        const { parentContainer } = gameObject;

        return (
          gameObject !== this &&
          gameObject.active &&
          parentContainer &&
          parentContainer.depth === depth
        );
      });

      if (filteredBodies.length > 0) {
        atEdge = false;
      }
    }

    if (atEdge) {
      const { list } = this.scene.data.values.depths[depth].collide;
      const rect = new Phaser.Geom.Rectangle(x, y, width, height);

      for (const object of list) {
        if (object instanceof Phaser.Tilemaps.TilemapLayer) {
          const tiles = object.getTilesWithinShape(rect, { isColliding: true });
          if (tiles.length > 0) {
            atEdge = false;
            break;
          }
        }
      }
    }

    if (atEdge) {
      this.setVelocityX(newVelocity.x).setVelocityY(newVelocity.y);
    }
  }

  overlap(other) {
    const { values } = this.data;
    let properties = null;

    if (other instanceof Phaser.Tilemaps.Tile) {
      properties = other.properties;
    } else {
      properties = other.data.values;
    }

    if (properties.isSlope) {
      values.onSlope = true;
    } else if (properties.isLadder) {
      values.onLadder = true;
    } else if (properties.isIce) {
      values.onIce = true;
    } else if (properties.isNonSnow) {
      values.onNonSnow = true;
    }
  }

  positionBubbleAndItem(type) {
    let { x, y } = this;
    const { bubbles, bubbleItems, machine } = this.data.values;
    const { name } = machine.currentState;
    const offset = bubbleOffsets[type];
    const item = bubbleItems[type];

    switch (name) {
      case "walk.left":
        x -= 1;
        break;
      case "walk.right":
        x += 1;
        break;
      default:
        break;
    }

    bubbles[type].setX(x).setY(y - offset.bubble);

    if (item) {
      item.setX(x).setY(y - offset.item);
    }
  }

  bubble({ type, key, frame, delay = 2000, leaveBubble = false, completion }) {
    const container = this.scene.data.values.depths.bubble;
    const { values } = this.data;
    const { bubbles, bubbleItems } = values;
    const bubble = bubbles[type];
    const { scene } = this;
    const item = scene.add.image(0, 0, key, frame).setAlpha(0);

    bubbleItems[type] = item;

    this.positionBubbleAndItem(type);

    container.add(bubble);
    container.add(item);

    scene.enableObject(bubble);

    const targets = [item];
    if (!leaveBubble) {
      targets.push(bubble);
    }

    scene.tweens.add({
      targets: [bubble, item],
      alpha: 1,
      duration: 200,
      onComplete: () => {
        scene.tweens.add({
          targets,
          delay,
          alpha: 0,
          duration: 200,
          onComplete: () => {
            if (!leaveBubble) {
              scene.disableObject(bubble);
            }

            item.destroy();
            bubbleItems[type] = null;

            if (completion) {
              completion();
            }
          },
        });
      },
    });
  }
}

export default Character;
