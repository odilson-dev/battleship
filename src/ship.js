class Ship {
  constructor(length, numberOfHits, isSunk) {
    this.length = length;
    this.numberOfHits = numberOfHits;
  }

  hits() {
    this.numberOfHits++;
  }

  isSunk() {
    return this.length <= 0 ? true : false;
  }
}
