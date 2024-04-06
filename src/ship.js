export default class Ship {
  constructor(name, length, direction) {
    this.name = name;
    this.hits = 0;
    this.length = length;
    this.direction = direction;
    this.isSunk = false;
  }

  hit() {
    this.hits++;
    if (this.hits === this.length) {
      this.isSunk = true;
    }
  }
}
