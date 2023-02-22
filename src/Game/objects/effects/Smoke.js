import Sprite from "../Sprite";

class Smoke extends Sprite {
  constructor(scene) {
    super(scene);

    this.setAlpha(0.3);
    this.play(
      {
        key: "smoke",
        delay: 300,
      },
      true
    );
  }
}

export default Smoke;
