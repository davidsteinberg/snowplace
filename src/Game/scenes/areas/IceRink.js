import Area from "./Area";

class IceRink extends Area {
  create(data = {}) {
    super.create(data);

    const { Chest, Snowsuit } = this.data.values.objects;
    const { items } = this.registry.values;
    const { from } = data;
    let xOffset = 0;

    if (items.crystal) {
      Chest.play("chest.open", true);
    } else {
      Chest.data.values.item = "crystal";
    }

    if (from === "IceRinkExit1") {
      xOffset = -16;
    } else if (from === "IceRinkExit3") {
      xOffset = 16;
    }

    Snowsuit.setX(Snowsuit.x + xOffset);

    this.fadeInMusic("ice_rink");
  }
}

export default IceRink;
