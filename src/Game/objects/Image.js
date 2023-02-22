import Phaser from "phaser";

class Image extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene);

    scene.add.existing(this);
  }

  collide(other) {}

  overlap(other) {}
}

export default Image;
