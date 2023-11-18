class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    const grid = [];

    for (let col = 0; col < height; col++) {
      const currRow = [];

      for (let row = 0; row < width; row++) {
        const random = Math.floor(Math.random() * 2);
        random === 0 ? currRow.push("🌳") : currRow.push("🌲");
      }
      grid.push(currRow);
    }

    console.log(grid);
  }
}

const grid = new Grid(5, 5);
