import { GridObject } from "./GridObject.js";
import { ItemObject } from "./ItemObject.js";
import { EnemyObject } from "./EnemyObject.js";
import { Player } from "./Player.js";
import { getUserDirection } from "./PlayerInput.js";

class Grid {
  #currentObject;

  constructor(width, height, playerStartPosX = 0, playerStartPosY = height - 1) {
    this.width = width;
    this.height = height;

    this.playerPosX = playerStartPosX;
    this.playerPosY = playerStartPosY;
    this.player = new Player("Wizard", { attack: 5, defense: 5, hp: 20 });

    this.grid = [];

    for (let col = 0; col < height; col++) {
      const currRow = [];

      for (let row = 0; row < width; row++) {
        const gridObject = new GridObject();
        currRow.push(gridObject);
      }

      this.grid.push(currRow);
    }

    this.grid[0][width - 1] = new GridObject("🌀", "exitPortal"); //end of the level
    this.grid[height - 1][0] = new GridObject("🧙", "Player"); //player starting position

    this.startGame();
  }

  async startGame() {
    while (this.player.getPlayerStats().hp > 0) {
      this.displayGrid();

      const response = await getUserDirection();

      switch (response) {
        case "Up": {
          this.movePlayerUp();
          break;
        }
        case "Down": {
          this.movePlayerDown();
          break;
        }
        case "Left": {
          this.movePlayerLeft();
          break;
        }
        case "Right": {
          this.movePlayerRight();
          break;
        }
      }

      console.log("------------------------------------------");
    }
  }
  displayGrid() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        process.stdout.write(this.grid[row][col].icon);
        process.stdout.write("    ");
      }

      process.stdout.write("\n");
    }
  }

  generateGridObject() {
    const random = Math.random();

    if (random < 0.15) {
      // Generate Weapon - Placeholder

      return new ItemObject("🔮", { name: "Crystal Ball", attack: 5, defense: 2, hp: 5 });
    } else if (random < 0.35) {
      //Generete Enemy - Placeholder

      return new EnemyObject("🐺", { name: "Wolf", attack: 2, defense: 1, hp: 6 });
    } else {
      //Nothing

      return new GridObject("👣", "footprints");
    }
  }

  handleTurn() {
    if (this.grid[this.playerPosY][this.playerPosX].type === "exitPortal") {
      console.log(`You reached the end of the level🎉`);
      process.exit();
    }

    if (this.#currentObject.type === "footprints") {
      this.#currentObject.describe();
      return;
    }

    if (this.#currentObject.type === "item") {
      this.#currentObject.describe();
      const stats = this.#currentObject.getStats();
      this.player.addToStats(stats);
    }

    if (this.#currentObject.type === "enemy") {
      this.#currentObject.describe();

      const enemyStats = this.#currentObject.getEnemyStats();
      const enemyName = this.#currentObject.getEnemyName();

      const playerStats = this.player.getPlayerStats();

      if (enemyStats.defense > playerStats.defense) {
        console.log(`💀You lose - ${enemyName} was too powerful💀`);
        process.exit();
      }

      let totalPlayerDamage = 0;

      while (enemyStats.hp > 0) {
        const enemyDamageTakenTurn = playerStats.attack - enemyStats.defense;
        const playerDamageTakenTurn = enemyStats.attack - playerStats.defense;

        if (enemyDamageTakenTurn > 0) {
          enemyStats.hp -= enemyDamageTakenTurn;
        }

        if (playerDamageTakenTurn > 0) {
          playerStats.hp -= playerDamageTakenTurn;
          totalPlayerDamage += playerDamageTakenTurn;
        }
      }

      if (playerStats.hp <= 0) {
        console.log(`💀You lose - ${enemyName} was too powerful💀`);
        process.exit();
      }

      this.player.addToStats({ hp: -totalPlayerDamage });
      console.log(`You defeated the ${enemyName}`);
      this.player.describe();
    }
  }
  // refactor needed

  movePlayerRight() {
    //edge of the map check
    if (this.playerPosX === this.width - 1) {
      console.log("Can't go there");
      return;
    }

    //handle moving player
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("👣", "footprints");

    this.playerPosX += 1;

    // check if we discovered tile already
    if (this.grid[this.playerPosY][this.playerPosX].type === "footprints") {
      this.grid[this.playerPosY][this.playerPosX].describe();
      this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile
    this.#currentObject = this.generateGridObject();
    this.handleTurn();
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
  }
  movePlayerLeft() {
    //edge of the map check
    if (this.playerPosX === 0) {
      console.log("Can't go there");
      return;
    }

    //handle moving player
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("👣", "footprints");

    this.playerPosX -= 1;

    // check if we discovered tile already
    if (this.grid[this.playerPosY][this.playerPosX].type === "footprints") {
      this.grid[this.playerPosY][this.playerPosX].describe();
      this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile
    this.#currentObject = this.generateGridObject();
    this.handleTurn();
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
  }

  movePlayerUp() {
    //edge of the map check

    if (this.playerPosY === 0) {
      console.log("Can't go there");
      return;
    }

    //handle moving player
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("👣", "footprints");

    this.playerPosY -= 1;

    // check if we discovered tile already
    if (this.grid[this.playerPosY][this.playerPosX].type === "footprints") {
      this.grid[this.playerPosY][this.playerPosX].describe();
      this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile
    this.#currentObject = this.generateGridObject();
    this.handleTurn();
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
  }

  movePlayerDown() {
    //edge of the map check

    if (this.playerPosY === this.height - 1) {
      console.log("Can't go there");
      return;
    }

    //handle moving player
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("👣", "footprints");

    this.playerPosY += 1;

    // check if we discovered tile already
    if (this.grid[this.playerPosY][this.playerPosX].type === "footprints") {
      this.grid[this.playerPosY][this.playerPosX].describe();
      this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile
    this.#currentObject = this.generateGridObject();
    this.handleTurn();
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
  }
}

new Grid(10, 10);
