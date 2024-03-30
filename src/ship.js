export default class Ship {
  constructor(direction, start_square, length = 1) {
    this.direction = direction;
    this.start_square = start_square;
    this.length = length;
    this.numberOfHits = 0;
  }

  //Create and returns the coordinates of the ship on the gameBoard
  getCoordinates() {
    let coordinate = [];
    let count = 0;
    let start_square = [...this.start_square];
    if (this.direction == "vertical") {
      do {
        coordinate.push(start_square);
        // As start_square is the coordinate of the first square of the ship
        // start_square[x, y], we increment y, so the ship can grow vertically on the gameboard
        start_square[1]++;
        count++;
      } while (count < this.length);
      return coordinate;
    } else if (this.direction == "horizontal") {
      do {
        coordinate.push(start_square);
        // As start_square is the coordinate of the first square of the ship
        // start_square[x, y], we increment x, so the ship can grow horizontally on the gameboard
        start_square[1]++;
        count++;
      } while (count < this.length);
      return coordinate;
    }
  }

  hit(enemy) {
    enemy.length--;
    return this.numberOfHits++;
  }

  isSunk() {
    return this.length <= 0 ? true : false;
  }
}
