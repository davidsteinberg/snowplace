import Options from "./Options";

class Pause extends Options {
  get title() {
    return "Paused";
  }

  get buttonTitle() {
    return "Resume";
  }

  performButtonAction() {
    this.scene.stop();
    this._sceneToResume.resume();
  }

  create(data) {
    const { centerX: x, centerY: y, width, height } = this.cameras.main;

    this._sceneToResume = data.scene;
    this.add.rectangle(x, y, width, height, 0x000000, 0.4);

    super.create(data);
  }
}

export default Pause;
