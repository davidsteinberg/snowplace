import "./Game.css";
import Phaser from "phaser";
import defaults from "./defaults";
import scenes from "./scenes";
import { useEffect, useRef } from "react";

const Game = ({ landscape, full }) => {
  const ref = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game({
      title: "Snow Place",
      url: "https://mmm.david.recipes/snowplace",
      version: "0.1.0",
      pixelArt: true,
      scene: scenes[0],
      parent: ref.current,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
      },
    });

    game.registry.set(defaults);

    for (const scene of scenes.slice(1)) {
      game.scene.add(scene.name, scene);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`Game ${full ? "" : landscape ? "landscape" : "portrait"}`}
    ></div>
  );
};

export default Game;
