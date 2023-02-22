import Area from "./Area";

class Cave2_1 extends Area {
  create(data = {}) {
    super.create(data);

    const { Chest, Mole, Snowsuit, Stair } = this.data.values.objects;
    const { items, crystalMolesMoved } = this.registry.values;
    const moles = Mole.getChildren();

    if (items.key) {
      Chest.play("chest.open", true);
    } else {
      Chest.data.values.item = "key";
    }

    if (crystalMolesMoved) {
      const [mole1, mole2] = moles;
      mole1.setX(136).setY(72).setFrame(0);
      mole2.setX(136).setY(120).setFrame(1);
    } else {
      moles.forEach((m) => m.setFrame(3));
    }

    Stair.data.set({ to: "Cave2" });
    Snowsuit.data.values.machine.setStateNamed("idle.left");

    this.fadeInMusic("cave");
  }
}

export default Cave2_1;
