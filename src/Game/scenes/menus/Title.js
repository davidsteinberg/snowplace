import Menu from "./Menu";

class Title extends Menu {
  create() {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;

    this.addText({
      text: "Snow Place",
      x,
      y: y - 160,
      size: 120,
      shadow: { offsetY: 4, fill: true },
    });

    const yOffset = y;
    const size = 40;

    const play = this.addText({
      text: "Play",
      x,
      y: yOffset,
      size: 55,
      shadow: { offsetY: 4, fill: true },
    });

    const options = this.addText({
      text: "Options",
      x,
      y: yOffset + 105,
      size,
      shadow: { offsetY: 4, fill: true },
    });

    const credits = this.addText({
      text: "Credits",
      x,
      y: yOffset + 200,
      size,
      shadow: { offsetY: 4, fill: true },
    });

    this.setGrid([[play], [options], [credits]]);

    this.setFirstButton(play);
    this.start();
  }

  clickButton(button) {
    this.input.enabled = false;
    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.scene.start(button.text);
      },
    });
  }
}

export default Title;
