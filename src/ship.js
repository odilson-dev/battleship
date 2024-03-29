export default class Ship {
  constructor(length = 1) {
    this.length = length;
    this.numberOfHits = 0;
  }

  hit(enemy) {
    enemy.length--;
    return this.numberOfHits++;
  }

  isSunk() {
    return this.length <= 0 ? true : false;
  }
}
