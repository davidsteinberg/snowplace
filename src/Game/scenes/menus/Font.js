import Menu from "./Menu";

class Font extends Menu {
  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addLink({
      text: "The Sniglet font",
      url: "https://github.com/theleagueof/sniglet",
      x,
      y: yOffset,
      width: 360,
    });

    yOffset += 60;

    this.addText({
      text: "was created by",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "Haley Fiege",
      url: "https://www.haleyfiege.fun",
      x,
      y: yOffset,
      width: 250,
    });

    yOffset += 60;

    this.addText({
      text: "released under an",
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    yOffset += 60;

    this.addLink({
      text: "Open Font License, Version 1.1",
      url: "https://github.com/theleagueof/sniglet/blob/master/Open%20Font%20License.markdown",
      x,
      y: yOffset,
      width: 670,
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
        this.scene.start("Credits");
      },
    });
  }
}

export default Font;
