import Load from "./Load";
import debugging from "../util/debugging";
import names from "./names";
import propertyArrayToObject from "../util/propertyArrayToObject";
import { createAnimations } from "../objects";

class LoadTilesets extends Load {
  preload() {
    super.preload();

    // Load tilesets and maps for all scenes
    const loadedTilesetNames = [];

    for (const name of names) {
      const { tilesets } = this.cache.json.get(name);

      for (const tileset of tilesets) {
        const { name, image, tilewidth, tileheight, margin, spacing } = tileset;

        if (loadedTilesetNames.includes(name)) {
          // Skip already loaded tilesets
          continue;
        } else {
          loadedTilesetNames.push(name);
        }

        if (debugging) {
          console.log("Loading tileset/spritesheet: ", name);
        }

        const fullImage = image.replace("..", "");

        this.load.spritesheet(name, fullImage, {
          frameWidth: tilewidth,
          frameHeight: tileheight,
          margin,
          spacing,
        });
      }

      if (debugging) {
        console.log("Loading tilemap JSON: ", name);
      }

      this.load.tilemapTiledJSON(name, `maps/${name}.json`);
    }
  }

  create() {
    createAnimations(this);

    // Add animations from tilesets
    for (const name of names) {
      const { tilesets } = this.cache.json.get(name);

      for (const tileset of tilesets) {
        const { name, tiles } = tileset;

        for (const tile of tiles) {
          const { animation, properties } = tile;
          if (animation === undefined) {
            continue;
          }

          const { anim } = propertyArrayToObject(properties);
          if (anim === undefined) {
            throw new Error(
              "No key for animation: ",
              animation,
              ", tileset: ",
              name,
              ", index: ",
              tile.index
            );
          }

          const { key, repeat, yoyo } = anim;
          if (key === undefined) {
            throw new Error(
              "No key for animation: ",
              animation,
              ", tileset: ",
              name,
              ", index: ",
              tile.index
            );
          }

          this.anims.create({
            key,
            frames: animation.map((a) => ({
              key: name,
              frame: a.tileid,
              duration: a.duration,
            })),
            yoyo,
            repeat,
          });
        }
      }
    }

    this.scene.start("LoadAssets");
  }
}

export default LoadTilesets;
