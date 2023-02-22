import ArcadeImage from "./ArcadeImage";
import ArcadeSprite from "./ArcadeSprite";
import Image from "./Image";
import Sprite from "./Sprite";
import characters from "./characters";
import effects from "./effects";
import items from "./items";

const objects = {};

Object.assign(objects, characters);
Object.assign(objects, effects);
Object.assign(objects, items);

const objectClassesByName = {
  ArcadeImage,
  ArcadeSprite,
  Image,
  Sprite,
};

for (const [name, Class] of Object.entries(objects)) {
  objectClassesByName[name] = Class;
}

const createAnimations = (scene) => {
  for (const Class of Object.values(objects)) {
    if (Class.createAnimations) {
      Class.createAnimations(scene);
    }
  }
};

export { createAnimations, objectClassesByName };
