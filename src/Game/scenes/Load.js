import Phaser from "phaser";

class Load extends Phaser.Scene {
  preload() {
    const { worldView, width, height } = this.cameras.main;
    const x = worldView.x + width / 2;
    const y = worldView.y + height / 2;

    this.add
      .text(x, y, "Loading...", {
        fontFamily: "sans-serif",
        fontSize: "100px",
      })
      .setOrigin(0.5);
  }
}

export default Load;
