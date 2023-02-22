const dirs = "left right up down".split(" ");

const idle = {
  get name() {
    return `idle.${this.dir}`;
  },

  update({ machine }) {
    const { sprite } = machine;
    const { values } = sprite.data;
    const { controls } = values;

    sprite.setVelocityX(0).setVelocityY(0);

    for (const dir of dirs) {
      if (controls[dir]) {
        machine.setStateNamed(`walk.${dir}`);
        return;
      }
    }

    const { name } = sprite.constructor;
    const { dir } = this;

    if (values.onLadder) {
      sprite.play(`${name}.climb.idle`, true);
    } else {
      sprite.play(`${name}.idle.${dir}`, true);
    }
  },
};

export default idle;
