export default class GameBoard {
  constructor() {
    this.data = Array.from({ length: 10 }, () => Array(10));
  }
}
