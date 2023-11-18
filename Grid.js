import { GridObject } from "./GridObject.js";

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.grid = [];

    for (let col = 0; col < height; col++) {
      const currRow = [];

      for (let row = 0; row < width; row++) {
        const gridObject = new GridObject();
        currRow.push(gridObject);
      }

      this.grid.push(currRow);
    }

    this.grid[0][this.grid[0].length - 1] = new GridObject("🌀", "exitPortal"); //end of the level
    this.grid[this.grid.length - 1][0] = new GridObject("🧙", "Player"); //player starting position

    this.displayGrid();
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
}

const grid = new Grid(6, 10);
