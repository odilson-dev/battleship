export default class GameBoard {
  constructor() {
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
  }
  placeShip() {
    const shipPositions = [];
    for (let i = 0; i < ship.length; i++) {
      let posX = x;
      let posY = y;
      if (direction === "horizontal") {
        posX += i;
      } else if (direction === "vertical") {
        posY += i;
      } else {
        throw new Error('Invalid direction. Use "horizontal" or "vertical".');
      }
      if (posX >= this.size || posY >= this.size) {
        throw new Error("Ship placement out of bounds.");
      }
      if (this.grid[posY][posX] !== null) {
        throw new Error("Another ship is already placed here.");
      }
      shipPositions.push([posX, posY]);
    }

    shipPositions.forEach(([posX, posY]) => {
      this.grid[posY][posX] = ship;
    });

    this.ships.push({ ship, shipPositions });
  }
  receiveAttack(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error("Attack out of bounds.");
    }

    const target = this.grid[y][x];
    if (target === null) {
      console.log("Miss!");
    } else {
      target.hit();
      console.log(`Hit on ${target.name}!`);
    }
  }
}
