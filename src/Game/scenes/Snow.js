import Phaser from "phaser";
import Scene from "./Scene";

class Snow extends Scene {
  init(data) {
    const { values } = this.registry;

    if (values.snowOffset === undefined) {
      const { RND } = Phaser.Math;

      values.snowOffset = {
        x: RND.between(-2, 2),
        y: RND.between(2, 4),
      };
    }
  }

  create(data) {
    const { centerX, centerY, width, height } = this.cameras.main;
    const snow = this.add.tileSprite(centerX, centerY, width, height, "snow");
    const { scene } = data;
    const camera = scene.cameras.main;

    this.data.set({
      snow,
      camera: {
        x: camera.scrollX,
        y: camera.scrollY,
      },
      ticker: 0,
    });

    this.data.values.callingScene = scene;
    this.cameras.main
      .setAlpha(scene.scene.key === "Start" ? 0.4 : 1)
      .fadeIn(400);
  }

  update(time, delta) {
    const { values } = this.data;
    const { snowOffset } = this.registry.values;
    const { snow, camera, callingScene } = values;
    const { scrollX, scrollY, zoom } = callingScene.cameras.main;

    if (camera.scrollX !== undefined) {
      const scrollXDelta = scrollX - camera.scrollX;
      const scrollYDelta = scrollY - camera.scrollY;

      snow.tilePositionX -= snowOffset.x - scrollXDelta * zoom;
      snow.tilePositionY -= snowOffset.y - scrollYDelta * zoom;
    }

    values.camera = { scrollX, scrollY };
    values.ticker += delta;

    if (values.ticker > 1000) {
      const { RND } = Phaser.Math;
      if (RND.frac() > 0.999) {
        const coin = RND.between(0, 1);

        if (coin === 0) {
          let x = snowOffset.x + RND.between(-1, 1);

          if (x < -10) {
            x = -10;
          } else if (x > 10) {
            x = 10;
          }

          snowOffset.x = x;
        } else {
          let y = snowOffset.y + RND.between(-1, 1);

          if (y < 2) {
            y = 2;
          } else if (y > 10) {
            y = 10;
          }

          snowOffset.y = y;
        }

        values.ticker = 0;
      }
    }
  }
}

export default Snow;
