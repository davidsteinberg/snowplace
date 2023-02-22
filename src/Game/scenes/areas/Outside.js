import Area from "./Area";

class Outside extends Area {
  create(data = {}) {
    super.create(data);

    const { objects, depths } = this.data.values;
    const { Chest, Door, Explosion, Trigger, Slash, Snowsuit } = objects;
    const { items, isOpen } = this.registry.values;
    const { from } = data;
    const doors = Door.getChildren();
    const triggers = Trigger.getChildren();

    let object = Snowsuit;
    let yOffset = 0;
    let dir = "down";

    switch (from) {
      case "Cave1":
      case "Cave2":
      case "House":
        object = doors.filter((d) => d.data.values.scene === from)[0];
        yOffset = 8;
        break;
      case "Cave1SecretExit":
      case "IceRinkExit1":
      case "IceRinkExit2":
      case "IceRinkExit3":
        object = triggers.filter((t) => t.data.values.from === from)[0];
        yOffset = -16;
        dir = "up";
        break;
      default:
        break;
    }

    for (const door of doors) {
      const { scene } = door.data.values;
      if (isOpen[scene]) {
        door.setVisible(false);
      }

      if (scene === "Cave2") {
        // Hack to get the explosion to appear "in front of" the door,
        // since objects in depth containers are being sorted by their `y`
        Explosion.setY(door.y + 1);
      }
    }

    if (items.axe) {
      Chest.play("chest.open", true);
    } else {
      Chest.data.values.item = "axe";
    }

    depths[object.depth].object.add(Snowsuit);
    Snowsuit.setX(object.x)
      .setY(object.y + yOffset)
      .data.values.machine.setStateNamed(`idle.${dir}`);

    this.disableObject(Slash);
    this.disableObject(Explosion);

    this.fadeInMusic("outside");
    this.scene.run("Snow", { scene: this });
  }
}

export default Outside;
