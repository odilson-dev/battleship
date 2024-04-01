export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.hits = 0;
    this.length = length;
    this.isSunk = false;
  }

  hit() {
    this.hits++;
    if (this.hits === this.length) {
      this.isSunk = true;
    }
  }
}
