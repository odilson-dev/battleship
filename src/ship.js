export default class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
  }

  hits() {
    return this.numberOfHits++;
  }

  isSunk() {
    return this.length <= 0 ? true : false;
  }
}
