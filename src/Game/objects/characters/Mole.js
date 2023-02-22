import Character from "./Character";
import Phaser from "phaser";

const delay = 2000;
const dirs = ["left", "right", "up", "down"];

class Mole extends Character {
  get velocity() {
    const { RND } = Phaser.Math;
    return {
      x: RND.between(15, 25),
      y: RND.between(15, 25),
    };
  }

  constructor(scene) {
    super(scene);

    const controls = {};
    const dir = Phaser.Math.RND.pick(dirs);
    dirs.forEach((d) => (controls[d] = d === dir));

    this.data.set({
      controls,
      ticker: 0,
      randomized: true,
    });
  }

  update(time, delta) {
    const { values } = this.data;
    if (values.immobile) {
      return;
    }

    if (values.randomized) {
      values.ticker += delta;

      if (values.ticker > delay) {
        const { RND } = Phaser.Math;

        if (RND.frac() > 0.99) {
          const { controls } = values;
          const dir = RND.pick(dirs);

          dirs.forEach((d) => (controls[d] = d === dir));
          values.ticker = 0;
        }
      }
    }

    super.update(time, delta);
  }
}

export default Mole;
