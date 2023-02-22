import Phaser from "phaser";
import StateMachine from "../util/StateMachine";

class ArcadeSprite extends Phaser.Physics.Arcade.Sprite {
  static get isStatic() {
    return false;
  }

  static get shouldUpdate() {
    return true;
  }

  static createAnimations(scene) {
    // Add animations for this type of sprite
  }

  constructor(scene, states, start, updateBodyEveryFrame = false) {
    super(scene);

    scene.physics.add.existing(this, this.constructor.isStatic);

    if (states) {
      const machine = new StateMachine({ states, start });

      this.setDataEnabled();
      this.data.set({ machine });

      machine.sprite = this;
      machine.start();
    }

    if (updateBodyEveryFrame) {
      const handler = (animation, _frame, gameObject, frameKey) => {
        gameObject.scene.setCollision(gameObject);
      };

      this.on("animationstart", handler).on("animationupdate", handler);
    }
  }

  collide(other) {}

  overlap(other) {}

  update(time, delta) {
    const { machine } = this.data.values;
    if (machine) {
      const { currentState } = machine;
      const { update } = currentState;
      if (update) {
        update.bind(currentState)({ machine, time, delta });
      }
    }
  }
}

export default ArcadeSprite;
