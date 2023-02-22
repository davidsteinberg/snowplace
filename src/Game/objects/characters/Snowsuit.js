import Character from "./Character";
import Mole from "./Mole";
import controls from "../../../controls";
import items from "../items";

const { Chest, Door, Stair } = items;
const doorData = {
  Cave1: {
    item: "axe",
    effect: "Slash",
  },
  Cave2: {
    item: "bomb",
    effect: "Explosion",
  },
  House: {
    item: "key",
  },
};

class Snowsuit extends Character {
  constructor(scene) {
    super(scene);

    this.data.set({
      controls,
      x: 0,
      y: 0,
    });

    const handleAnimationChange = (animation, frame, gameObject, frameKey) => {
      const [, type, dir] = animation.key.split(".");
      if (type !== "walk") {
        return;
      }

      const { index } = frame;
      if (index === 2) {
        return;
      }

      const { onNonSnow, onIce } = gameObject.data.values;
      if (onNonSnow || onIce) {
        return;
      }

      let { scene, parentContainer, x, y, body } = gameObject;
      if (!["Outside", "IceRink"].includes(scene.scene.key)) {
        return;
      }

      if (body.blocked[dir]) {
        return;
      }

      let width = 5;
      let height = 6;

      if (dir === "left") {
        if (index === 1) {
          // left is down
          y += 7;
          x += 3;
        } else {
          // 3, right is down
          y += 3;
          x += 3;
        }

        width = 7;
        height = 4;
      } else if (dir === "right") {
        if (index === 1) {
          // right is down
          y += 7;
          x -= 3;
        } else {
          // 3, left is down
          y += 3;
          x -= 3;
        }

        width = 7;
        height = 4;
      } else if (dir === "up") {
        if (index === 1) {
          // right is down
          x += 3;
          y += 5;
        } else {
          // 3, left is down
          x -= 3;
          y += 5;
        }
      } else if (dir === "down") {
        if (index === 1) {
          // left is down (on right side)
          x -= 3;
          y += 5;
        } else {
          // 3, right is down (on left side)
          x += 3;
          y += 5;
        }
      }

      const footprint = scene.add.ellipse(x, y, width, height, 0x000000, 0.1);
      parentContainer.add(footprint);

      scene.tweens.add({
        targets: footprint,
        alpha: 0,
        duration: 2000,
        onComplete: () => {
          parentContainer.remove(footprint, true);
        },
      });
    };

    this.on("animationstart", handleAnimationChange).on(
      "animationupdate",
      handleAnimationChange
    );
  }

  // Collisions

  collide(other) {
    super.collide(other);

    if (other instanceof Chest) {
      this.interactWithChest(other);
    } else if (other instanceof Door) {
      this.interactWithDoor(other);
    } else if (other instanceof Stair) {
      this.interactWithStair(other);
    } else if (other instanceof Mole) {
      this.interactWithMole(other);
    }
  }

  // Triggers

  trigger(trigger) {
    const { key } = trigger.data.values;

    if (key === "depth") {
      this.interactWithDepthTrigger(trigger);
    } else if (key === "scene") {
      this.interactWithSceneTrigger(trigger);
    } else {
      console.log("Unhandled trigger, key: ", key);
    }
  }

  // Interactions

  interactWithChest(chest) {
    const { item } = chest.data.values;
    const { items, itemFrames } = this.scene.registry.values;

    if (!items[item]) {
      items[item] = true;

      chest.once("animationcomplete", () => {
        this.bubble({
          type: "exclamation",
          key: "tiles",
          frame: itemFrames[item],
        });
      });

      chest.play("chest.open", true);
    }
  }

  interactWithDepthTrigger(trigger) {
    const { newDepth } = trigger.data.values;
    this.scene.data.values.depths[newDepth].object.add(this);
  }

  interactWithDoor(door) {
    const { values } = this.data;

    if (values.machine.currentState.name === "walk.up") {
      const { scene } = this;
      const { items, isOpen, itemFrames } = scene.registry.values;
      const { scene: sceneName } = door.data.values;
      const { item, effect: effectName } = doorData[sceneName];

      if (isOpen[sceneName]) {
        scene.transitionTo(sceneName);
      } else if (items[item]) {
        if (effectName) {
          const effect = scene.data.values.objects[effectName];
          effect
            .setVisible(true)
            .setActive(true)
            .once("animationcomplete", () => {
              door.setVisible(false);
              effect.setVisible(false).setActive(false);
              isOpen[sceneName] = true;
            })
            .play(effectName, true);
        } else {
          door.setVisible(false);
          isOpen[sceneName] = true;
        }
      } else if (!values.bubbles.thought.active) {
        this.bubble({
          type: "thought",
          key: "tiles",
          frame: itemFrames[item],
        });
      }
    }
  }

  interactWithMole(mole) {
    const { scene } = this;
    const { immobile } = mole.data.values;
    const { values } = this.data;
    const { registry } = scene;

    if (
      immobile &&
      !registry.values.crystalMolesMoved &&
      !values.chestConversationIsHappening
    ) {
      const { items, itemFrames, emotionFrames } = registry.values;

      const moveMoles = () => {
        registry.values.crystalMolesMoved = true;
        const [mole1, mole2] = scene.data.values.objects.Mole.getChildren();

        mole1.play("Mole.walk.left");
        mole2.play("Mole.walk.left");

        scene.tweens.add({
          targets: [mole1, mole2],
          x: "-=16",
          duration: 700,
          onComplete: () => {
            mole1.play("Mole.walk.up");
            mole2.play("Mole.walk.down");

            scene.tweens.add({
              targets: mole1,
              y: "-=16",
              duration: 700,
              onComplete: () => {
                mole1.play("Mole.idle.down");
              },
            });

            scene.tweens.add({
              targets: mole2,
              y: "+=16",
              duration: 700,
              onComplete: () => {
                mole2.play("Mole.idle.up");
              },
            });
          },
        });
      };

      const molesDiscuss = () => {
        const [mole1, mole2] = scene.data.values.objects.Mole.getChildren();
        mole1.play("Mole.idle.down");
        mole2.play("Mole.idle.up");

        scene.time.delayedCall(500, () => {
          mole.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.dots,
            completion: () => {
              mole1.play("Mole.idle.right");
              mole2.play("Mole.idle.right");

              scene.time.delayedCall(500, () => {
                mole.bubble({
                  type: "speech",
                  key: "emotions",
                  frame: emotionFrames.happy,
                  completion: () => {
                    moveMoles();
                  },
                });
              });
            },
          });
        });
      };

      const presentCrystal = () => {
        this.bubble({
          type: "speech",
          key: "tiles",
          frame: itemFrames.crystal,
          leaveBubble: true,
          completion: () => {
            this.bubble({
              type: "speech",
              key: "emotions",
              frame: emotionFrames.question,
              completion: () => {
                molesDiscuss();
              },
            });
          },
        });
      };

      values.chestConversationIsHappening = true;

      this.bubble({
        type: "speech",
        key: "tiles",
        frame: itemFrames.chest,
        completion: () => {
          mole.bubble({
            type: "speech",
            key: "emotions",
            frame: emotionFrames.money,
            completion: () => {
              if (items.crystal) {
                presentCrystal();
              } else {
                this.bubble({
                  type: "speech",
                  key: "emotions",
                  frame: emotionFrames.dots,
                  completion: () => {
                    values.chestConversationIsHappening = false;
                  },
                });
              }
            },
          });
        },
      });
    }
  }

  interactWithSceneTrigger(trigger) {
    const { values } = this.data;
    if (values.interactedWithSceneTrigger) {
      return;
    }

    const { to, from } = trigger.data.values;

    this.scene.transitionTo(to, { from });
    values.interactedWithSceneTrigger = true;
  }

  interactWithStair(stair) {
    this.scene.transitionTo(stair.data.values.to, {
      pause: {
        sound: false,
      },
    });
  }
}

export default Snowsuit;
