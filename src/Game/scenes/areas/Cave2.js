import Area from "./Area";

class Cave2 extends Area {
  create(data = {}) {
    super.create(data);

    const { Snowsuit, Stair } = this.data.values.objects;
    let dir = "up";

    if (data.from === "Cave2_1") {
      Snowsuit.setX(Stair.x - 16).setY(Stair.y - 1);

      dir = "left";
    } else {
      this.fadeInMusic("cave");
    }

    Stair.data.set({ to: "Cave2_1" });
    Snowsuit.data.values.machine.setStateNamed(`idle.${dir}`);
  }
}

export default Cave2;
