import Load from "./Load";
import WebFont from "webfontloader";

class LoadAssets extends Load {
  preload() {
    super.preload();

    this.load.image("snow", "img/fx/snow.png");

    for (const type of ["thought", "speech", "exclamation"]) {
      this.load.image(`${type}_bubble`, `img/bubbles/${type}.png`);
    }

    this.load.spritesheet("emotions", "img/emotions.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    const music = {
      outside: 11,
      cave: 5,
      ice_rink: 14,
      house: 18,
    };

    for (const [key, value] of Object.entries(music)) {
      this.load.audio(
        key,
        ["ogg", "mp3"].map((ending) => `music/theme-${value}.${ending}`)
      );
    }
  }

  create() {
    WebFont.load({
      custom: {
        families: ["Sniglet"],
      },
      active: () => {
        this.scene.start("Start");
      },
      inactive() {
        debugger;
      },
      fontinactive() {
        debugger;
      },
    });
  }
}

export default LoadAssets;
