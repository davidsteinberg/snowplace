import End from "./End";
import LoadAssets from "./LoadAssets";
import LoadJSON from "./LoadJSON";
import LoadTilesets from "./LoadTilesets";
import Snow from "./Snow";
import Start from "./Start";
import areas from "./areas";
import menus from "./menus";

const scenes = [
  LoadJSON,
  LoadTilesets,
  LoadAssets,
  Start,
  ...areas,
  ...menus,
  Snow,
  End,
];

export default scenes;
