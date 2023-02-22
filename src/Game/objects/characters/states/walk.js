const walk = {
  get name() {
    return `walk.${this.dir}`;
  },

  update({ machine }) {
    const { dir, multiplier = 1 } = this;
    const { sprite } = machine;
    const { values } = sprite.data;
    const { controls } = values;

    if (!controls[dir]) {
      machine.setStateNamed(`idle.${dir}`);
      return;
    }

    this.applyVelocity({
      sprite,
      velocity: values.velocity,
      divider: 1.2,
      multiplier,
      controls,
    });

    const { name } = sprite.constructor;
    if (values.onLadder) {
      sprite.play(`${name}.climb.move`, true);
    } else {
      sprite.play(`${name}.walk.${dir}`, true);
    }
  },
};

export default walk;
