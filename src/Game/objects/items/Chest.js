import ArcadeSprite from "../ArcadeSprite";

class Chest extends ArcadeSprite {
  constructor(scene) {
    super(scene);

    this.setPushable(false);
  }

  static get shouldUpdate() {
    return false;
  }
}

export default Chest;
