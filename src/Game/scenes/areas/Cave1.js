import Area from "./Area";

class Cave1 extends Area {
  create(data = {}) {
    super.create(data);

    const { Door, Trigger, Snowsuit, Stair } = this.data.values.objects;
    const { from } = data;
    let dir = "up";

    if (this.registry.values.isOpen[this.constructor.name]) {
      this.disableObject(Door);
    }

    if (from === "Cave1_1") {
      Snowsuit.setX(Stair.x - 16).setY(Stair.y - 1);

      dir = "left";
    } else {
      this.fadeInMusic("cave");

      if (from === "Cave1SecretExit") {
        const trigger = Trigger.getChildren().filter(
          (t) => t.data.values.from === "Cave1SecretExit"
        )[0];

        Snowsuit.setX(trigger.x).setY(trigger.y + 21);

        dir = "down";
      }
    }

    Stair.data.set({ to: "Cave1_1" });
    Snowsuit.data.values.machine.setStateNamed(`idle.${dir}`);
  }
}

export default Cave1;
