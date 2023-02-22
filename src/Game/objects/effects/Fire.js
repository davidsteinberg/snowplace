import Sprite from "../Sprite";

class Fire extends Sprite {
  static get isStatic() {
    return true;
  }

  constructor(scene) {
    super(scene);

    this.play("fire", true);
  }
}

export default Fire;
