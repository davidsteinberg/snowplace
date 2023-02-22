const controls = {
  className: "hidden",

  ui: {
    left: false,
    right: false,
    up: false,
    down: false,
  },

  on: {
    left() {},
    right() {},
    up() {},
    down() {},
    select() {},
    pause() {},
    resume() {},
  },

  attach({ input }) {
    this.keys = input.keyboard.addKeys("left,right,up,down,w,a,s,d");

    // Left
    ["left", "a"].forEach((name) =>
      this.keys[name].on("down", () => this.on.left())
    );

    // Right
    ["right", "d"].forEach((name) =>
      this.keys[name].on("down", () => this.on.right())
    );

    // Up
    ["up", "w"].forEach((name) =>
      this.keys[name].on("down", () => this.on.up())
    );

    // Down
    ["down", "s"].forEach((name) =>
      this.keys[name].on("down", () => this.on.down())
    );

    // Select
    const onSelect = () => {
      this.on.select();
    };

    input.keyboard.on("keydown-ENTER", onSelect).on("keydown-SPACE", onSelect);
  },

  get left() {
    const { keys } = this;
    return keys.left.isDown || keys.a.isDown || this.ui.left;
  },

  get right() {
    const { keys } = this;
    return keys.right.isDown || keys.d.isDown || this.ui.right;
  },

  get up() {
    const { keys } = this;
    return keys.up.isDown || keys.w.isDown || this.ui.up;
  },

  get down() {
    const { keys } = this;
    return keys.down.isDown || keys.s.isDown || this.ui.down;
  },
};

export default controls;
