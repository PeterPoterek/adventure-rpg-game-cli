import { GridObject } from "./GridObject.js";

class ItemObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  };
  constructor(icon, stats) {
    super(icon);

    this.type = "item";
    this.#stats = stats;
  }

  getItemName() {
    return this.#stats.name;
  }

  getStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  describe() {
    const stats = this.#stats;
    console.log(`You found a ${stats.name}${stats.icon}`);
    console.log(`${stats.name}'s stats: ATK:${stats.attack} DEF:${stats.defense} HP:${stats.hp}`);
  }
}
