import Menu from "./Menu";
import hasTouch from "../../../touch";

class Play extends Menu {
  create() {
    super.create();

    const camera = this.cameras.main;
    const { centerX: x, centerY: y } = camera;
    let yOffset = y - 160;

    this.addText({
      text: "Controls",
      x,
      y: yOffset,
      size: 105,
      shadow: { offsetY: 3, fill: true },
    });

    yOffset += 140;

    const strings = hasTouch
      ? [
          ["Directional pad", "Move / Interact"],
          ["Select or Pause", "Pause / Options"],
        ]
      : [
          ["Arrows or WASD", "Move / Interact"],
          ["Space or Enter", "Pause / Options"],
        ];

    const size = 35;
    const shadow = { offsetY: 2, fill: true };
    const xOffset = 50;

    for (const [left, right] of strings) {
      this.addText({
        text: left,
        x: x - xOffset,
        y: yOffset,
        size,
        shadow,
        origin: { x: 1, y: 0.5 },
      });

      this.addText({
        text: "=",
        x,
        y: yOffset,
        size,
        shadow,
      });

      this.addText({
        text: right,
        x: x + xOffset,
        y: yOffset,
        size,
        shadow,
        origin: { x: 0, y: 0.5 },
      });

      yOffset += 100;
    }

    const start = this.addText({
      text: "Start",
      x,
      y: yOffset + 35,
      size: 40,
      shadow: { offsetY: 1, fill: true },
    });

    this.setGrid([[start]]);

    this.start();
  }

  clickButton(button) {
    const camera = this.cameras.main;
    const snowScene = this.scene.get("Snow");

    snowScene.cameras.main.fadeOut(300);

    camera.on("camerafadeoutcomplete", (camera) => {
      snowScene.scene.stop();
      this.scene.stop("Start");
      this.scene.start("Outside", { from: this.constructor.name });
    });

    camera.fadeOut(400);
  }
}

export default Play;
