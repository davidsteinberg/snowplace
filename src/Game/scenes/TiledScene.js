import Phaser from "phaser";
import Scene from "./Scene";
import debugging from "../util/debugging";
import propertyArrayToObject from "../util/propertyArrayToObject";
import { objectClassesByName } from "../objects";

class TiledScene extends Scene {
  setCollision(gameObject) {
    const {
      name: frame,
      texture: { key },
    } = gameObject.frame;

    const { tilesets } = this.data.values.tilemap;
    const t = tilesets.filter((t) => t.name === key);

    if (t.length === 0) {
      throw new Error(`No tileset for key: ${key}`);
    }

    if (debugging) {
      console.log(
        "Setting collision for gameObject: ",
        gameObject,
        ", key: ",
        key,
        ", frame: ",
        frame
      );
    }

    const setDefaultCollision = () => {
      const { width, height } = gameObject.frame;
      gameObject.body.setSize(width, height);
    };

    const collision = t[0].tileData[frame];
    if (!collision) {
      setDefaultCollision();
      return;
    }

    const { objectgroup } = collision;
    if (!objectgroup) {
      setDefaultCollision();
      return;
    }

    const box = objectgroup.objects[0];
    let { x, y, width, height } = box;

    if (gameObject.flipX) {
      x = gameObject.width - (x + width);
    }

    gameObject.body.setSize(width, height).setOffset(x, y);
  }

  create(data) {
    const { name } = this.constructor;
    if (debugging) {
      console.log("Creating Tiled scene: ", name);
    }

    // Create/set values accessible later to subclasses
    const tilemap = this.make.tilemap({ key: name });
    const layers = {};
    const objects = {};
    const dynamicObjects = [];

    this.data.set({
      tilemap,
      layers,
      objects,
      dynamicObjects,
    });

    // Position camera and physics
    const camera = this.cameras.main;
    const { widthInPixels, heightInPixels } = tilemap;

    this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels);
    camera.setBounds(0, 0, widthInPixels, heightInPixels);

    // Add images and create object config
    const tilesetImages = [];
    const createFromObjectsConfig = [];

    for (const tileset of tilemap.tilesets) {
      const { firstgid, name, tileProperties } = tileset;
      const tilesetImage = tilemap.addTilesetImage(name, name);

      for (const [index, properties] of Object.entries(tileProperties)) {
        const className = properties.class;
        if (!className) {
          continue;
        }

        const Class = objectClassesByName[className];
        if (Class === undefined) {
          throw new Error(
            "No class defined with name: ",
            className,
            " @ tileset: ",
            name,
            ", index: ",
            index
          );
        }

        const frame = parseInt(index);

        createFromObjectsConfig.push({
          gid: firstgid + frame,
          classType: Class,
          key: name,
          frame,
        });
      }

      tilesetImages.push(tilesetImage);
    }

    // Layers
    for (const layerData of tilemap.layers) {
      const { name, properties, visible } = layerData;
      const layer = tilemap.createLayer(name, tilesetImages);
      const layerProperties = propertyArrayToObject(properties);
      const { depth: layerDepth } = layerProperties;
      const collisionTiles = {};

      if (layerDepth !== undefined) {
        layer.setDepth(layerDepth);
      }

      layer.setVisible(visible);
      layer.setDataEnabled();

      Object.assign(layer.data.values, layerProperties);

      layer.forEachTile((tile) => {
        const { index } = tile;
        if (index === -1) {
          return;
        }

        const { properties } = tile;
        const { depth, visible } = properties;
        const collision = tile.getCollisionGroup();

        if (collision === null) {
          if (visible !== undefined) {
            tile.visible = visible;
          }
          return;
        }

        const x = tile.getCenterX();
        const y = tile.getCenterY();

        if (collisionTiles[index] === undefined) {
          collisionTiles[index] = this.physics.add.staticGroup();
        }

        for (const box of collision.objects) {
          const { firstgid, name } = tile.tileset;
          const collisionTile = collisionTiles[index].create(
            x,
            y,
            name,
            index - firstgid
          );

          collisionTile.setDataEnabled();
          Object.assign(collisionTile.data.values, properties);

          if (visible !== undefined) {
            collisionTile.setVisible(visible);
          }

          if (depth !== undefined) {
            collisionTile.setDepth(depth);
          } else if (layerDepth !== undefined) {
            collisionTile.setDepth(layerDepth);
          }

          collisionTile.body
            .setSize(box.width, box.height)
            .setOffset(box.x, box.y);
        }

        layer.removeTileAt(tile.x, tile.y);
      });

      layers[name] = [layer, ...Object.values(collisionTiles)];
    }

    // Objects
    for (const objectLayer of tilemap.objects) {
      const { name, properties } = objectLayer;
      const { depth: layerDepth } = propertyArrayToObject(properties);
      const gameObjects = tilemap.createFromObjects(
        name,
        createFromObjectsConfig
      );

      for (const gameObject of gameObjects) {
        const {
          name,
          shouldUpdate = false,
          isStatic = true,
        } = gameObject.constructor;
        const existingObject = objects[name];
        const { values } = gameObject.data;

        for (const [, property] of Object.entries(values)) {
          const { name, value } = property;
          values[name] = value;
        }

        const { depth } = values;

        if (gameObject.body) {
          this.setCollision(gameObject);
        }

        if (depth !== undefined) {
          gameObject.setDepth(depth);
        } else if (layerDepth !== undefined) {
          gameObject.setDepth(layerDepth);
        }

        if (shouldUpdate) {
          dynamicObjects.push(gameObject);
        }

        if (existingObject === undefined) {
          objects[name] = gameObject;
        } else if (existingObject instanceof Phaser.GameObjects.Group) {
          existingObject.add(gameObject);
        } else {
          let group = null;

          if (
            existingObject instanceof Phaser.Physics.Arcade.Sprite ||
            existingObject instanceof Phaser.Physics.Arcade.Image
          ) {
            group = isStatic
              ? this.physics.add.staticGroup()
              : this.physics.add.group();
          } else {
            group = this.add.group();
          }

          group.add(existingObject);
          group.add(gameObject);

          objects[name] = group;
        }
      }
    }
  }
}

export default TiledScene;
