import Load from "./Load";
import debugging from "../util/debugging";
import names from "./names";

class LoadingJSON extends Load {
  preload() {
    super.preload();

    // Load each scene's JSON
    for (const name of names) {
      if (debugging) {
        console.log("Loading raw map JSON: ", name);
      }

      this.load.json(name, `maps/${name}.json`);
    }
  }

  create() {
    this.scene.start("LoadTilesets");
  }
}

export default LoadingJSON;
