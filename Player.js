class Player {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  };

  constructor(icon, stats) {
    this.icon = icon;
    this.#stats = stats;
  }

  getPlayerName() {
    return this.#stats.name;
  }

  getPlayerStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  addToStats(stats) {
    if (stats.attack) {
      this.#stats.attack += stats.attack;
    }
    if (stats.defense) {
      this.#stats.defense += stats.defense;
    }
    if (stats.hp) {
      this.#stats.hp += stats.hp;
    }
  }
  describe() {
    const stats = this.#stats;
    console.log(`${stats.name}'s stats are ATK:${stats.attack} DEF:${stats.defense} HP:${stats.hp}`);
  }
}

export { Player };
