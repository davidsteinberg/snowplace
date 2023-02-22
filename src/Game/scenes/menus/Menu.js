import Phaser from "phaser";
import controls from "../../../controls";

class Menu extends Phaser.Scene {
  // Phaser
  create() {
    this._ellipse = this.add.ellipse(0, 0, 1, 1, 0x000000, 0.3);
    this._container = this.add.container();
    this._grid = null;
    this._indexes = { row: 0, col: 0 };
    this._highlightedButton = null;

    controls.attach(this);

    "left right up down select".split(" ").forEach((name) => {
      controls.on[name] = () => this[name]();
    });
  }

  // Movement
  left() {
    const { _grid, _indexes } = this;
    let { row: rowIndex, col: colIndex } = _indexes;
    const row = _grid[rowIndex];

    colIndex -= 1;
    if (colIndex === -1) {
      colIndex = row.length - 1;
    }

    _indexes.col = colIndex;

    this.highlightButton(row[colIndex]);
  }

  right() {
    const { _grid, _indexes } = this;
    let { row: rowIndex, col: colIndex } = _indexes;
    const row = _grid[rowIndex];

    colIndex += 1;
    if (colIndex === row.length) {
      colIndex = 0;
    }

    _indexes.col = colIndex;

    this.highlightButton(row[colIndex]);
  }

  up() {
    const { _grid, _indexes } = this;
    let { row: rowIndex, col: colIndex } = _indexes;

    rowIndex -= 1;
    if (rowIndex === -1) {
      rowIndex = _grid.length - 1;
    }

    const row = _grid[rowIndex];
    const { length } = row;

    while (colIndex >= length) {
      colIndex -= 1;
    }

    _indexes.row = rowIndex;
    _indexes.col = colIndex;

    this.highlightButton(row[colIndex]);
  }

  down() {
    const { _grid, _indexes } = this;
    let { row: rowIndex, col: colIndex } = _indexes;

    rowIndex += 1;
    if (rowIndex === _grid.length) {
      rowIndex = 0;
    }

    const row = _grid[rowIndex];
    const { length } = row;

    while (colIndex >= length) {
      colIndex -= 1;
    }

    _indexes.row = rowIndex;
    _indexes.col = colIndex;

    this.highlightButton(row[colIndex]);
  }

  select() {
    this.input.enabled = false;
    this.clickButton(this._highlightedButton);
  }

  // Custom
  addText({
    text,
    x,
    y,
    size,
    color = "white",
    origin = { x: 0.5, y: 0.5 },
    shadow,
    stroke = 0,
  }) {
    const style = {
      fontFamily: "Sniglet",
      fontSize: `${size}px`,
      align: "center",
      color,
      stroke: "black",
      strokeThickness: stroke,
    };

    if (shadow) {
      style.shadow = shadow;
    }

    const object = this.add.text(x, y, text, style);
    object.setOrigin(origin.x, origin.y);

    this._container.add(object);

    return object;
  }

  addLink({ text, url, x, y, width }) {
    const link = this.addText({
      text,
      x,
      y,
      size: 40,
      shadow: { offsetY: 2, fill: true },
    });

    link.setInteractive({ cursor: "pointer" });
    link.on("pointerup", () => {
      window.open(url);
    });

    this.add.rectangle(x, y + 18, width, 1, 0xffffff).setDepth(-1);
    this.add.rectangle(x, y + 20, width, 2, 0x444444).setDepth(-1);
  }

  // Must be called within `create`
  setGrid(grid) {
    this._grid = grid;
  }

  // Must be called within `create`
  setFirstButton(button) {
    this.highlightButton(button, true);
  }

  // Must be called at the end of `create`
  start() {
    const { _container, _grid } = this;
    if (_grid === null) {
      throw new Error(
        "Menu subclass must call `setGrid` before calling `start`: ",
        this
      );
    }

    if (this._highlightedButton === null) {
      this.highlightButton(_grid[0][0], true);
    }

    _container.setAlpha(0);

    this.tweens.add({
      targets: _container,
      alpha: 1,
      duration: 400,
      onComplete: () => {
        for (const row of _grid) {
          for (const button of row) {
            button
              .setInteractive({ useHandCursor: true })
              .on("pointerover", () => {
                this.highlightButton(button);
              })
              .on("pointerdown", () => {
                this.clickButton(button);
              });
          }
        }
      },
    });
  }

  highlightButton(button, immediate = false) {
    if (button === this._highlightedButton) {
      return;
    }

    for (const [rowIndex, row] of Object.entries(this._grid)) {
      for (const [colIndex, col] of Object.entries(row)) {
        if (button === col) {
          this._indexes = {
            row: parseInt(rowIndex),
            col: parseInt(colIndex),
          };
        } else {
          col.setScale(1);
        }
      }
    }

    const { scale } = button;
    const displayWidth = (button.displayWidth / scale) * 1.5;
    const displayHeight = (button.displayHeight / scale) * 1.6;
    const duration = immediate ? 0 : 100;

    this.tweens.add({
      targets: button,
      scale: 1.05,
      duration,
    });

    this.tweens.add({
      targets: this._ellipse,
      displayWidth,
      displayHeight,
      x: button.x,
      y: button.y,
      duration,
    });

    this._highlightedButton = button;
  }

  clickButton(button) {
    throw new Error("Menu subclass must implement `clickButton`: ", this);
  }
}

export default Menu;
