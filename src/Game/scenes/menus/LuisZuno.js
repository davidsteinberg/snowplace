import Menu from "./Menu";

class LuisZuno extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addLink({
      text: "The key, fire, and bomb",
      url: "https://opengameart.org/content/top-down-adventure-assets",
      x,
      y: yOffset,
      width: 535,
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
      text: "Luis Zuno",
      url: "https://twitter.com/ansimuz",
      x,
      y: yOffset,
      width: 205,
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

    yOffset += 125;

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

export default LuisZuno;
