export default class GameBoard {
  constructor() {
    this.data = Array.from({ length: 10 }, () => Array(10));
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
}
