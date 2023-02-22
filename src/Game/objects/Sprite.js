import Phaser from "phaser";
import StateMachine from "../util/StateMachine";

class Sprite extends Phaser.GameObjects.Sprite {
  static get shouldUpdate() {
    return true;
  }

  static createAnimations(scene) {
    // Add animations for this type of sprite
  }

  constructor(scene, states, start) {
    super(scene);

    scene.add.existing(this);

    if (states) {
      const machine = new StateMachine({ states, start });

      this.setDataEnabled();
      this.data.set({ machine });

      machine.sprite = this;
      machine.start();
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

export default Sprite;
