export default class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }
  placeShip(ship, x, y, direction) {
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
      // Check if posX or posY are out of bounds of the grid

      if (
        !(range(this.size).includes(posX) && range(this.size).includes(posY))
      ) {
        throw new Error("Ship placement out of bounds.");
      }
      // Check if another ship is placed at the possX and posY
      else if (this.grid[posY][posX] !== null) {
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
      this.missedAttacks.push([x, y]);
      return "Miss!";
    } else {
      target.hit();
      return `Hit on ${target.name}!`;
    }
  }
  haveAllShipsBeenSunk() {
    const sunkData = this.ships.map((item) => {
      return item.ship.isSunk;
    });

    return sunkData.every((x) => x === true);
  }

  displayBoard(place) {
    // This part of the code should be after the creation of the game boards and before rendering them

    document.addEventListener("DOMContentLoaded", () => {
      let draggedElement;
      // Populate player's board

      let y = 0;
      this.grid.forEach((row) => {
        const rowElement = document.createElement("tr");
        let x = 0;
        row.forEach((cell) => {
          const cellElement = document.createElement("td");

          cellElement.classList.add("cell");
          cellElement.setAttribute("data-x", x);
          cellElement.setAttribute("data-y", y);
          x++;

          rowElement.appendChild(cellElement);
        });
        y++;
        place.appendChild(rowElement);
      });

      // Populate computer's board
    });
  }
}
// range is a function that basically takes a number(n) and return a list of all integers from 0 to n excluded.
function range(n) {
  var ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(i);
  }
  return ans;
}
