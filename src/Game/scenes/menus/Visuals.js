import Menu from "./Menu";

class Visuals extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: "Visuals",
      x,
      y: yOffset,
      size: 105,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 105;

    const pixelBoy = this.addText({
      text: "Pixel-boy",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 65;

    const kenney = this.addText({
      text: "Kenney",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 65;

    const armandoMontero = this.addText({
      text: "Armando Montero",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 65;

    const luisZuno = this.addText({
      text: "Luis Zuno",
      x,
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

    this.setGrid([[pixelBoy], [kenney], [armandoMontero], [luisZuno], [back]]);

    this.setFirstButton(back);
    this.start();
  }

  clickButton(button) {
    let { text } = button;
    if (text === "Back") {
      text = "Credits";
    }

    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.scene.start(text.replace(/[-\s]/, ""));
      },
    });
  }
}

export default Visuals;
