export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y) {
    const shipPositions = [];
    let posX = x;
    let posY = y;
    for (let i = 0; i < ship.length; i++) {
      if (ship.direction === "horizontal") {
        posX += i;
      } else if (ship.direction === "vertical") {
        posY += i;
      } else {
        throw new Error('Invalid direction. Use "horizontal" or "vertical".');
      }
      // Check if posX or posY are out of bounds of the grid

      if (
        !(
          range(this.size).includes(parseInt(x)) &&
          range(this.size).includes(parseInt(y))
        )
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
  // This method checks whether it is possible to place ships from a coordinnate, it does almost the same thing as placeShip but it's just for test
  canThisShipBePlacedHere(ship, x, y) {
    let posX = parseInt(x);
    let posY = parseInt(y);

    for (let i = 0; i < ship.length; i++) {
      if (ship.direction === "horizontal") {
        posX += i;
      } else if (ship.direction === "vertical") {
        posY += i;
      } else {
        console.log("Invalid direction. Use 'horizontal' or 'vertical'");
        return false;
      }

      if (isPositionWithinBounds(posX, posY)) {
        console.log("Ship placement out of bounds.");
        return false;
      }
      // Check if another ship is placed at the possX and posY
      else if (this.grid[posY][posX] !== null) {
        console.log(`PosX: ${posX}, ${posY}`);
        console.log("Another ship is already placed here.");
        return false;
      }
    }
    console.log("Ok");
    return true;
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

export class ComputerGameBoard extends GameBoard {
  constructor() {
    super();
  }

  allowPlayerToAttackComputer(computerBoardDOM) {
    document.addEventListener("DOMContentLoaded", () => {
      const allOpponentCells = Array.from(
        computerBoardDOM.getElementsByClassName("cell")
      );

      allOpponentCells.forEach((element) => {
        element.addEventListener("click", () => {
          if (
            this.receiveAttack(
              element.getAttribute("data-x"),
              element.getAttribute("data-y")
            ) == "Miss!"
          ) {
            element.classList.add("missed");
          } else {
            element.classList.add("hit");
          }
        });
      });
    });
  }
}

export function isPositionWithinBounds(posX, posY) {
  return !(
    range(10).includes(parseInt(posX)) && range(10).includes(parseInt(posY))
  );
}
// range is a function that basically takes a number(n) and return a list of all integers from 0 to n excluded.
function range(n) {
  var ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(i);
  }
  return ans;
}
