import "./Select.css";
import controls from "../controls";
import pause from "./pause.png";
import select from "./select.png";
import { useEffect, useState } from "react";

const Select = ({ landscape }) => {
  const [paused, setPaused] = useState(true);
  const onPointerDown = () => controls.on.select();

  useEffect(() => {
    controls.on.pause = () => setPaused(true);
    controls.on.resume = () => setPaused(false);
  }, []);

  return (
    <div
      className={`Select ${controls.className} ${
        landscape ? "landscape" : "portrait"
      }`}
    >
      <img
        src={paused ? select : pause}
        alt={paused ? "Select" : "Pause"}
        draggable="false"
        onPointerDown={onPointerDown}
      />
    </div>
  );
};

export default Select;
