import Phaser from "phaser";

class ArcadeImage extends Phaser.Physics.Arcade.Image {
  static get isStatic() {
    return true;
  }

  static get shouldUpdate() {
    return false;
  }

  constructor(scene) {
    super(scene);

    scene.physics.add.existing(this, false);
    this.setPushable(false);

    this.setDataEnabled();
  }

  collide(other) {}

  overlap(other) {}
}

export default ArcadeImage;
