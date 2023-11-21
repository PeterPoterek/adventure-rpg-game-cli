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

    this.grid[0][width - 1] = new GridObject("🌀", "exitPortal"); //end of the level
    this.grid[height - 1][0] = new GridObject("🧙", "Player"); //player starting position
  }

  // refactor needed
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
    this.grid[this.playerPosY][this.playerPosX] = new GridObject("👣", "footprints");

    this.playerPosX += 1;

    // check if we discovered tile already
    if (this.grid[this.playerPosY][this.playerPosX].type === "footprints") {
      this.grid[this.playerPosY][this.playerPosX].describe();
      this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
      return;
    }

    // handle discovering a tile

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

    this.grid[this.playerPosY][this.playerPosX] = new GridObject("🧙", "player");
  }
}

const grid = new Grid(10, 10);

grid.displayGrid();
console.log();

grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();
grid.movePlayerRight();

grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.movePlayerLeft();
grid.displayGrid();
