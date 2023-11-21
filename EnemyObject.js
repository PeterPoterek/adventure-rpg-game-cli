import { GridObject } from "./GridObject.js";

class EnemyObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  };
  constructor(icon, stats) {
    super(icon);

    this.type = "enemy";
    this.#stats = stats;
  }

  getEnemyName() {
    return this.#stats.name;
  }

  getEnemyStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  describe() {
    const stats = this.#stats;
    console.log(`You encountered a ${stats.name}${this.icon}!`);
    console.log(`${stats.name} Stats: ATK:${stats.attack} DEF:${stats.defense} HP:${stats.hp}`);
  }
}

export { EnemyObject };
