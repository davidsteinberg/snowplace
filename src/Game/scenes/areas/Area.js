import Phaser from "phaser";
import TiledScene from "../TiledScene";
import Trigger from "../../objects/items/Trigger";
import controls from "../../../controls";

class Area extends TiledScene {
  create(data) {
    super.create(data);

    const { values } = this.data;
    const { add } = this;

    const depths = {};
    let maxDepth = 0;

    const ensureDepthExists = (depth) => {
      if (depth > maxDepth) {
        maxDepth = depth;
      }

      if (depths[depth] === undefined) {
        depths[depth] = {
          collide: add.container().setDepth(depth),
          overlap: add.container().setDepth(depth),
          object: add.container().setDepth(depth),
          trigger: add.container().setDepth(depth),
        };
      }
    };

    for (const [layer, ...groups] of Object.values(values.layers)) {
      const { depth = 0, type } = layer.data.values;
      if (type === undefined) {
        continue;
      }

      ensureDepthExists(depth);

      const container = depths[depth][type];

      if (type === "collide") {
        layer.setCollisionByExclusion(-1);
      }

      container.add(layer);

      for (const group of groups) {
        for (const child of group.getChildren()) {
          container.add(child);
        }
      }
    }

    const handleObject = (object) => {
      const { depth = 0 } = object;
      let container = null;

      ensureDepthExists(depth);

      if (object instanceof Trigger) {
        container = depths[depth].trigger;
      } else {
        container = depths[depth].object;
      }

      container.add(object);
    };

    for (const object of Object.values(values.objects)) {
      if (object instanceof Phaser.GameObjects.Group) {
        for (const child of object.getChildren()) {
          handleObject(child);
        }
      } else {
        handleObject(object);
      }
    }

    depths.bubble = add.container().setDepth(maxDepth + 1);

    values.depths = depths;
    values.maxDepth = maxDepth;

    this.cameras.main
      .once("camerafadeincomplete", (camera) => {
        camera.setLerp(0.1);
      })
      .startFollow(values.objects.Snowsuit)
      .fadeIn(400);

    this.cameras.main.setZoom(3);
    this.resume();
  }

  update(time, delta) {
    super.update(time, delta);

    const { depths, maxDepth, objects } = this.data.values;
    const { Snowsuit } = objects;
    const { parentContainer } = Snowsuit;
    const { physics } = this;

    for (let i = 0; i <= maxDepth; i += 1) {
      const depth = depths[i];
      if (depth === undefined) {
        continue;
      }

      const { object, collide, overlap, trigger } = depth;

      object.sort("y");

      if (object !== parentContainer) {
        continue;
      }

      physics.collide(object.list, object.list, (object1, object2) => {
        object1.collide(object2);
        object2.collide(object1);
      });

      physics.collide(object.list, collide.list, (object, other) => {
        object.collide(other);
      });

      physics.overlap(Snowsuit, overlap.list, (object, other) => {
        object.overlap(other);
      });

      physics.overlap(Snowsuit, trigger.list, (object, trigger) => {
        object.trigger(trigger);
      });
    }
  }

  fadeInMusic(key) {
    const { registry } = this;
    const { music, sound } = registry.values;

    const playMusic = () => {
      const music = this.sound.add(key, { loop: true });

      registry.set({ music });
      music.play();

      if (!sound.music) {
        music.pause();
      }
    };

    if (music) {
      if (music.key === key) {
        return;
      }

      this.fadeOutMusic({
        completion: playMusic,
      });
    } else {
      playMusic();
    }
  }

  fadeOutMusic({ duration = 1000, completion }) {
    const { music } = this.registry.values;
    if (!music) {
      return;
    }

    this.tweens.add({
      targets: music,
      volume: 0,
      duration,
      onComplete: () => {
        music.stop();
        this.sound.remove(music);

        if (completion) {
          completion();
        }
      },
    });
  }

  transitionTo(to, data = {}) {
    const from = data.from || this.constructor.name;
    const pause = data.pause || {};
    pause.scene = false;
    pause.sound = false;

    this.pause(pause);

    let snowScene = null;
    if (this.scene.isActive("Snow")) {
      snowScene = this.scene.get("Snow");
      snowScene.cameras.main.fadeOut(300);
    }

    const camera = this.cameras.main;

    camera.on("camerafadeoutcomplete", (camera) => {
      if (snowScene) {
        snowScene.scene.stop();
      }
      this.scene.start(to, { from });
    });

    camera.fadeOut(400);
  }

  pause(data) {
    super.pause(data);
    controls.on.pause();

    if (this.scene.isActive("Snow")) {
      this.scene.get("Snow").cameras.main.setAlpha(0.4);
    }
  }

  resume(data) {
    if (this.scene.isActive("Snow")) {
      this.scene.get("Snow").cameras.main.setAlpha(1);
    }

    controls.on.select = () => {
      this.pause();
      this.scene.run("Pause", { scene: this });
    };

    controls.attach(this);
    controls.on.resume();

    super.resume(data);

    const { music, sound } = this.registry.values;
    if (music) {
      if (!sound.music) {
        music.pause();
      }
    }
  }
}

export default Area;
