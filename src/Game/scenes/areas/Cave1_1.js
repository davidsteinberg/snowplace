import Area from "./Area";

class Cave1_1 extends Area {
  create(data = {}) {
    super.create(data);

    const { Chest, Snowsuit, Stair } = this.data.values.objects;
    const { items } = this.registry.values;

    if (items.bomb) {
      Chest.play("chest.open", true);
    } else {
      Chest.data.values.item = "bomb";
    }

    Stair.data.set({ to: "Cave1" });
    Snowsuit.data.values.machine.setStateNamed("idle.left");

    this.fadeInMusic("cave");
  }
}

export default Cave1_1;
