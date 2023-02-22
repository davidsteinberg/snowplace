import Area from "./Area";

class House extends Area {
  create(data = {}) {
    super.create(data);

    const { Snowsuit, Stair } = this.data.values.objects;
    const { machine } = Snowsuit.data.values;

    this.fadeInMusic("house");
    machine.setStateNamed("idle.up");

    Stair.data.set({ to: "House_1" });
  }
}

export default House;
