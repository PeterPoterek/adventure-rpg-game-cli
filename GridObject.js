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
}

export { GridObject };
