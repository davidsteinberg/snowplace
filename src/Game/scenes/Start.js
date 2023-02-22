import Phaser from "phaser";
import TiledScene from "./TiledScene";
import controls from "../../controls";

const newGameData = {
  items: {
    key: false,
    axe: false,
    bomb: false,
    crystal: false,
  },
  isOpen: {
    House: false,
    Cave1: false,
    Cave2: false,
  },
  crystalMolesMoved: false,
};

class Start extends TiledScene {
  create(data = {}) {
    super.create(data);

    const { Image } = this.data.values.objects;

    this.registry.set(Phaser.Utils.Objects.DeepCopy(newGameData));
    this.add.rectangle(Image.x, Image.y, 500, 500, 0x000000, 0.4);

    this.scene.run("Title");
    this.scene.run("Snow", { scene: this });

    this.cameras.main.setZoom(3).startFollow(Image).fadeIn(400);

    // This should be encapsulated away from here
    document.querySelector(".Dpad")?.classList.remove("hidden");
    document.querySelector(".Select")?.classList.remove("hidden");
    controls.className = "";
  }
}

export default Start;
