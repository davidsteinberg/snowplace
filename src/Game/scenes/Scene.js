import Phaser from "phaser";
import debugging from "../util/debugging";

class Scene extends Phaser.Scene {
  constructor(properties = {}) {
    const { debug = debugging } = properties;

    super({
      physics: {
        default: "arcade",
        arcade: {
          debug,
        },
      },
    });

    this.restartCount = 0;
  }

  create(data) {
    this.data.values.dynamicObjects = [];
  }

  update(time, delta) {
    for (const object of this.data.values.dynamicObjects) {
      if (object.active && object.update) {
        object.update(time, delta);
      }
    }
  }

  pause(data = {}) {
    if (data.anims !== false) {
      this.anims.pauseAll();
    }

    if (data.physics !== false) {
      this.physics.pause();
    }

    if (data.scene !== false) {
      this.scene.pause();
    }

    if (data.sound !== false) {
      this.sound.pauseAll();
    }

    if (data.time !== false) {
      this.time.paused = true;
    }

    if (data.tweens !== false) {
      this.tweens.pauseAll();
    }
  }

  resume(data = {}) {
    if (data.anims !== false) {
      this.anims.resumeAll();
    }

    if (data.physics !== false) {
      this.physics.resume();
    }

    if (data.scene !== false) {
      this.scene.resume();
    }

    if (data.sound !== false) {
      this.sound.resumeAll();
    }

    if (data.time !== false) {
      this.time.paused = false;
    }

    if (data.tweens !== false) {
      this.tweens.resumeAll();
    }
  }

  disableObject(object) {
    object.setActive(false).setVisible(false);

    if (object.disableBody) {
      object.disableBody();
    }
  }

  enableObject(object) {
    object.setActive(true).setVisible(true);

    if (object.enableBody) {
      object.enableBody();
    }
  }
}

export default Scene;
