import idle from "./idle";
import walk_x from "./walk_x";
import walk_y from "./walk_y";

const states = [];

for (const dir of ["down", "left", "right", "up"]) {
  states.push(Object.assign(Object.create(idle), { dir }));
}

states.push(
  Object.assign(Object.create(walk_x), {
    dir: "left",
    multiplier: -1,
  })
);

states.push(
  Object.assign(Object.create(walk_x), {
    dir: "right",
  })
);

states.push(
  Object.assign(Object.create(walk_y), {
    dir: "up",
    multiplier: -1,
  })
);

states.push(
  Object.assign(Object.create(walk_y), {
    dir: "down",
  })
);

export default states;
