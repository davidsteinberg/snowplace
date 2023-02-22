import Menu from "./Menu";

class Pixelboy extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: "All of the music and almost all\nof the images were created by",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 80;

    this.addLink({
      text: "Pixel-boy",
      url: "https://twitter.com/2pblog1",
      x,
      y: yOffset,
      width: 200,
    });

    yOffset += 60;

    this.addText({
      text: "for the",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 55;

    this.addLink({
      text: "Superpowers asset packs",
      url: "https://github.com/sparklinlabs/superpowers-asset-packs",
      x,
      y: yOffset,
      width: 565,
    });

    yOffset += 60;

    this.addText({
      text: "released under a",
      x: x - 145,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this.addLink({
      text: "CCO license",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
      x: x + 195,
      y: yOffset,
      width: 245,
    });

    yOffset += 105;

    const back = this.addText({
      text: "Back",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this.setGrid([[back]]);

    this.setFirstButton(back);
    this.start();
  }

  clickButton(button) {
    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.scene.start("Credits");
      },
    });
  }
}

export default Pixelboy;
