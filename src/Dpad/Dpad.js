import "./Dpad.css";
import controls from "../controls";
import dpad from "./dpad.png";

const getDirections = (event) => {
  const { clientX, clientY, target } = event;
  const { left, right, top, bottom } = target.getBoundingClientRect();
  const size = right - left;
  const arrowSize = (size - 40) / 2;

  if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
    return [];
  }

  const directions = [];

  if (clientX < left + arrowSize) {
    directions.push("left");
  } else if (clientX > right - arrowSize) {
    directions.push("right");
  }

  if (clientY < top + arrowSize) {
    directions.push("up");
  } else if (clientY > bottom - arrowSize) {
    directions.push("down");
  }

  return directions;
};

const clearDirections = () => {
  controls.ui.left = false;
  controls.ui.right = false;
  controls.ui.up = false;
  controls.ui.down = false;
};

let pressed = false;
let inside = false;

const updateDirections = (event) => {
  clearDirections();

  if (!pressed) {
    return;
  }

  const directions = getDirections(event);
  for (const name of directions) {
    controls.ui[name] = true;
  }
};

const Dpad = ({ landscape }) => {
  const onPointerDown = (event) => {
    const directions = getDirections(event);
    for (const name of directions) {
      controls.on[name]();
      controls.ui[name] = true;
    }
    pressed = true;
    inside = true;
  };

  const onPointerMove = (event) => {
    if (!inside) {
      return;
    }

    updateDirections(event);
  };

  const onPointerEnter = (event) => {
    if (!pressed) {
      return;
    }

    inside = true;
    updateDirections(event);
  };

  const onPointerUp = () => {
    clearDirections();
    pressed = false;
    inside = false;
  };

  const onPointerLeave = () => {
    if (!pressed) {
      return;
    }

    clearDirections();
    inside = false;
  };

  return (
    <div
      className={`Dpad ${controls.className} ${
        landscape ? "landscape" : "portrait"
      }`}
    >
      <img
        src={dpad}
        alt="Direction controls"
        draggable="false"
        {...{
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerEnter,
          onPointerLeave,
        }}
      />
    </div>
  );
};

export default Dpad;
