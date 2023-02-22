import Menu from "./Menu";

class Code extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: "Code available on",
      x: x - 109,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 3, fill: true },
    });

    this.addLink({
      text: "GitHub",
      url: "https://github.com/davidsteinberg/snowplace",
      x: x + 189,
      y: yOffset,
      width: 150,
    });

    yOffset += 65;

    this.addText({
      text: "created by",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 65;

    this.addLink({
      text: "David Steinberg",
      url: "https://mmm.david.recipes",
      x,
      y: yOffset,
      width: 355,
    });

    yOffset += 135;

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

export default Code;
