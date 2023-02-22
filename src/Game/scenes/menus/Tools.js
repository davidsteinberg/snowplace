import Menu from "./Menu";

class Tools extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: "Developed with the",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "Phaser game framework",
      url: "https://github.com/photonstorm/phaser",
      x,
      y: yOffset,
      width: 550,
    });

    yOffset += 65;

    this.addText({
      text: "created by",
      x: x - 152,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this.addLink({
      text: "Richard Davey",
      url: "https://twitter.com/photonstorm",
      x: x + 152,
      y: yOffset,
      width: 315,
    });

    yOffset += 65;

    this.addText({
      text: "and the",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "Tiled Map Editor",
      url: "https://github.com/mapeditor/tiled",
      x,
      y: yOffset,
      width: 365,
    });

    yOffset += 65;

    this.addText({
      text: "created by",
      x: x - 235,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this.addLink({
      text: "Thorbjørn Lindeijer",
      url: "https://twitter.com/thorbjorn81",
      x: x + 135,
      y: yOffset,
      width: 440,
    });

    yOffset += 85;

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
    this.scene.start("Credits");
  }
}

export default Tools;
