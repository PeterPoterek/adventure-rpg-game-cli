import { GridObject } from "./GridObject.js";

class Grid {
  constructor(width, height, playerStartPosX = 0, playerStartPosY = height - 1) {
    this.width = width;
    this.height = height;

    this.playerPosX = playerStartPosX;
    this.playerPosY = playerStartPosY;

    this.grid = [];

    for (let col = 0; col < height; col++) {
      const currRow = [];

      for (let row = 0; row < width; row++) {
        const gridObject = new GridObject();
        currRow.push(gridObject);
      }

      this.grid.push(currRow);
    }

    this.grid[0][height - 1] = new GridObject("🌀", "exitPortal"); //end of the level
    this.grid[width - 1][0] = new GridObject("🧙", "Player"); //player starting position

    this.displayGrid();

    console.log(`Player current position is: ${this.playerPosX}X ${this.playerPosY}Y`);
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

  movePlayerRight() {
    //edge of the map check
    if (this.playerPosX === this.width - 1) {
      console.log("Can't go there");
      return;
    }

    //handle moving player
    let currentPlayerPos = this.grid[this.playerPosY][this.playerPosX];

    currentPlayerPos = new GridObject("👣", "footprints");
    this.playerPosX += 1;

    // check if we discovered tile already
    if (currentPlayerPos.type === "footprints") {
      currentPlayerPos = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile

    currentPlayerPos = new GridObject("🧙", "player");

    console.log(`Player current position is: ${this.playerPosX}X ${this.playerPosY}Y`);
  }
}

const grid = new Grid(5, 5);

grid.movePlayerRight();
