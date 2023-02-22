import Menu from "./Menu";

class Credits extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: "Credits",
      x,
      y: yOffset,
      size: 105,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 115;

    const xOffset = 170;
    const code = this.addText({
      text: "Code",
      x: x - xOffset,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    const tools = this.addText({
      text: "Tools",
      x: x + xOffset,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 75;

    const audio = this.addText({
      text: "Audio",
      x: x - xOffset,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    const visuals = this.addText({
      text: "Visuals",
      x: x + xOffset,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 75;

    const font = this.addText({
      text: "Font",
      x: x - xOffset,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 90;

    const back = this.addText({
      text: "Back",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this.setGrid([[code, tools], [audio, visuals], [font], [back]]);

    this.setFirstButton(back);
    this.start();
  }

  clickButton(button) {
    let { text } = button;
    if (text === "Back") {
      text = "Title";
    } else if (text === "Audio") {
      text = "Pixelboy";
    }

    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.scene.start(text);
      },
    });
  }
}

export default Credits;
