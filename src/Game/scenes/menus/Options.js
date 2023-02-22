import Menu from "./Menu";

class Options extends Menu {
  get title() {
    return "Options";
  }

  get buttonTitle() {
    return "Back";
  }

  performButtonAction() {
    this.tweens.add({
      targets: this.cameras.main,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.scene.start("Title");
      },
    });
  }

  create(data = {}) {
    super.create();

    const { centerX: x, centerY: y } = this.cameras.main;
    let yOffset = y - 160;

    this.addText({
      text: this.title,
      x,
      y: yOffset,
      size: 105,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 155;

    // Volumes

    const strings = ["Music"];
    const buttons = {};
    const underlines = {};

    for (const string of strings) {
      const lowerString = string.toLowerCase();
      const onOffset = 80;
      const offOffset = 210;

      this.addText({
        text: string,
        x: x - 250,
        y: yOffset,
        size: 40,
        shadow: { offsetY: 2, fill: true },
        origin: { x: 0, y: 0.5 },
      });

      const on = this.addText({
        text: "On",
        x: x + onOffset,
        y: yOffset,
        size: 40,
        shadow: { offsetY: 2, fill: true },
      });

      const off = this.addText({
        text: "Off",
        x: x + offOffset,
        y: yOffset,
        size: 40,
        shadow: { offsetY: 2, fill: true },
      });

      const underline = this.add.rectangle(
        x + onOffset,
        yOffset + 23,
        on.displayWidth,
        1,
        0x000000,
        0.9
      );

      underlines[lowerString] = underline;
      this._container.add(underline);

      buttons[lowerString] = { on, off };
      yOffset += 100;
    }

    yOffset += 30;

    buttons.action = this.addText({
      text: this.buttonTitle,
      x,
      y: yOffset,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    this._buttons = buttons;
    this._underlines = underlines;

    this.setGrid([[buttons.music.on, buttons.music.off], [buttons.action]]);

    this.setFirstButton(buttons.action);
    this.adjustUnderline({ music: true });
    this.start();
  }

  clickButton(button) {
    const { sound } = this.registry.values;
    const { music, action } = this._buttons;

    if (button === action) {
      this.performButtonAction();
    } else if (button === music.on) {
      const previous = sound.music;
      sound.music = true;

      if (!previous) {
        this.adjustUnderline({ music: true });
      }
    } else if (button === music.off) {
      const previous = sound.music;
      sound.music = false;

      if (previous) {
        this.adjustUnderline({ music: true });
      }
    }
  }

  adjustUnderline(opts) {
    const { sound } = this.registry.values;
    const { _buttons, _underlines } = this;

    for (const [key, bool] of Object.entries(opts)) {
      if (bool) {
        const buttons = _buttons[key];
        const button = sound[key] ? buttons.on : buttons.off;
        const underline = _underlines[key];

        const { x, scale } = button;
        const displayWidth = (button.displayWidth / scale) * 0.8;

        this.tweens.add({
          targets: underline,
          x,
          displayWidth,
          duration: 100,
        });
      }
    }
  }
}

export default Options;
