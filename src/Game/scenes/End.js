import Phaser from "phaser";

class End extends Phaser.Scene {
  create() {
    const camera = this.cameras.main;
    const { centerX: x, centerY: y } = camera;

    this.add
      .text(x, y - 40, "Thanks for\nplaying!", {
        fontFamily: "Sniglet",
        fontSize: `${100}px`,
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    const { values } = this.registry;
    const { music } = values;

    this.tweens.add({
      targets: music,
      volume: 0,
      delay: 7000,
      duration: 3000,
      onComplete: () => {
        music.stop();
        this.sound.remove(music);
        values.music = null;
        this.cameras.main
          .on("camerafadeoutcomplete", () => {
            this.scene.start("Start");
          })
          .fadeOut(400);
      },
    });
  }
}

export default End;
