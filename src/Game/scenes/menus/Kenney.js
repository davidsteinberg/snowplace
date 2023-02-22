import Menu from "./Menu";

class Kenney extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addLink({
      text: "On-screen controls",
      url: "https://kenney.nl/assets/onscreen-controls",
      x,
      y: yOffset,
      width: 416,
    });

    yOffset += 60;

    this.addText({
      text: "and",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "conversational images",
      url: "https://kenney.nl/assets/emotes-pack",
      x,
      y: yOffset,
      width: 500,
    });

    yOffset += 60;

    this.addText({
      text: "were created by",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "Kenney",
      url: "https://twitter.com/KenneyNL",
      x,
      y: yOffset,
      width: 150,
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

    yOffset += 100;

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
        this.scene.start("Visuals");
      },
    });
  }
}

export default Kenney;
