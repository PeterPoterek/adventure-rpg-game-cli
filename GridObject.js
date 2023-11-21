class GridObject {
  #backgroundIcons = ["🌳", "🌲"];

  constructor(icon, type = "background") {
    if (icon) {
      this.icon = icon;
    } else {
      const randomIndex = Math.floor(Math.random() * this.#backgroundIcons.length);
      this.icon = this.#backgroundIcons[randomIndex];
    }

    this.type = type;
  }

  describe() {
    const random = Math.random();

    if (random < 0.33) {
      console.log("Path is clear.");
    } else if (random < 0.66) {
      console.log("There is nothing here.");
    } else {
      console.log("You already been here.");
    }
  }
}

export { GridObject };
