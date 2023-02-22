import walk from "./walk";

const walk_y = Object.assign(Object.create(walk), {
  applyVelocity({ sprite, velocity, divider, multiplier, controls }) {
    let { x, y } = velocity;

    if (controls.left) {
      x /= -divider;
      y /= divider;
    } else if (controls.right) {
      x /= divider;
      y /= divider;
    } else {
      x = 0;
    }

    sprite.setVelocityX(x).setVelocityY(y * multiplier);
  },
});

export default walk_y;
