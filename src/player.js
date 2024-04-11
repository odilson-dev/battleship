class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attackOpponent(x, y) {
    this.gameboard.receiveAttack(x, y);
  }
}

class ComputerPlayer extends Player {
  constructor(gameboard) {
    super("Computer", gameboard);
    this.previousAttacks = [];
  }

  generateRandomAttack() {
    const x = Math.floor(Math.random() * this.gameboard.size);
    const y = Math.floor(Math.random() * this.gameboard.size);
    return [x, y];
  }

  attackOpponent() {
    let [x, y] = this.generateRandomAttack();
    // This loop ensures that the computer doesn't attack the same coordinates twice. It checks if the generated random coordinates [x, y] already exist in the previousAttacks array. If they do, it generates new random coordinates until it finds ones that haven't been attacked before.
    while (
      this.previousAttacks.some(([prevX, prevY]) => prevX === x && prevY === y)
    ) {
      [x, y] = this.generateRandomAttack();
    }
    this.previousAttacks.push([x, y]);
    this.gameboard.receiveAttack(x, y);
  }
}
