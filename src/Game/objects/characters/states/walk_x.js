import walk from "./walk";

const walk_x = Object.assign(Object.create(walk), {
  applyVelocity({ sprite, velocity, divider, multiplier, controls }) {
    let { x, y } = velocity;

    if (controls.up) {
      x /= divider;
      y /= -divider;
    } else if (controls.down) {
      x /= divider;
      y /= divider;
    } else {
      y = 0;
    }

    sprite.setVelocityX(x * multiplier).setVelocityY(y);
  },
});

export default walk_x;
