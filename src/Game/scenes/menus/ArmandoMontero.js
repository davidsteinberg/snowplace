import Menu from "./Menu";

class ArmandoMontero extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addLink({
      text: "Thought and speech bubbles",
      url: "https://opengameart.org/content/zelda-like-tilesets-and-sprites",
      x,
      y: yOffset,
      width: 635,
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
      text: "Armando Montero",
      url: "https://opengameart.org/users/armm1998",
      x,
      y: yOffset,
      width: 405,
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

export default ArmandoMontero;
