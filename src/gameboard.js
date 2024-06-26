// Set to store unique pairs of numbers
const chosenPairs = new Set();
const gameOverDialog = document.getElementById("gameOverDialog");

export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
    this.shipsRemaining = 6;
  }

  placeShip(ship, x, y) {
    const shipPositions = [];
    let posX = x;
    let posY = y;
    for (let i = 0; i < ship.length; i++) {
      // Check if posX or posY are out of bounds of the grid

      if (isPositionWithinBounds(x, y)) {
        throw new Error("Ship placement out of bounds.");
      }
      // Check if another ship is placed at the possX and posY
      else if (this.grid[posY][posX] !== null) {
        throw new Error("Another ship is already placed here.");
      }
      shipPositions.push([posX, posY]);
      if (ship.direction === "horizontal") {
        posX++;
      } else if (ship.direction === "vertical") {
        posY++;
      } else {
        throw new Error('Invalid direction. Use "horizontal" or "vertical".');
      }
    }

    shipPositions.forEach(([posX, posY]) => {
      this.grid[posY][posX] = ship;
    });

    this.ships.push({ ship, shipPositions });
  }
  // This method checks whether it is possible to place ships from a coordinate, it does almost the same thing as placeShip but it's just for test
  canThisShipBePlacedHere(ship, y, x) {
    let posX = parseInt(x);
    let posY = parseInt(y);

    for (let i = 0; i < ship.length; i++) {
      if (isPositionWithinBounds(posX, posY)) {
        return false;
      }
      // Check if another ship is placed at the possX and posY
      else if (this.grid[posY][posX] !== null) {
        return false;
      }
      if (ship.direction === "horizontal") {
        posX++;
      } else if (ship.direction === "vertical") {
        posY++;
      } else {
        return false;
      }
    }

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
  }
}

export class ComputerGameBoard extends GameBoard {
  constructor() {
    super();
    this.countAttackReceived = 0;
    this.chosenPairs = new Set();
  }

  allowPlayerToAttackComputer(computerBoardDOM, playerBoard, playerBoardDOM) {
    const allOpponentCells = Array.from(
      computerBoardDOM.getElementsByClassName("cell")
    );
    // Define the click event handler function
    const clickHandler = (event) => {
      this.countAttackReceived++;
      const posX = event.target.getAttribute("data-x");
      const posY = event.target.getAttribute("data-y");

      if (this.chosenPairs.has(`${posX}-${posY}`)) {
        return;
      }
      playAudio();

      this.chosenPairs.add(`${posX}-${posY}`);

      if (this.receiveAttack(posX, posY) == "Miss!") {
        event.target.classList.add("missed");
      } else {
        event.target.classList.add("hit");

        if (this.grid[posY][posX].isSunk) {
          this.shipsRemaining--;
          const shipsRemainingComputer = document.querySelector(
            ".ship-remaining-computer"
          );
          shipsRemainingComputer.textContent = `Ships remaining: ${this.shipsRemaining}`;
          shipsRemainingComputer.classList.add("red-background");
          setTimeout(() => {
            shipsRemainingComputer.classList.remove("red-background");
          }, 3000);
        }

        if (this.haveAllShipsBeenSunk()) {
          playGameOver();
          gameOverDialog.querySelector("h2").textContent =
            "Congratulations, you Win!!!";
          gameOverDialog.showModal();

          return;
        }
      }

      if (this.countAttackReceived % 5 == 0) {
        let audio = new Audio(`sounds/incoming_missile.mp3`);
        audio.play();
      }
      this.attackPlayerBoard(playerBoard, playerBoardDOM);
    };

    // Add click event listener to each element
    allOpponentCells.forEach((element) => {
      element.addEventListener("click", clickHandler);
    });
  }
  attackPlayerBoard(playerBoard, playerBoardDOM) {
    setTimeout(() => {
      const [x, y] = chooseRandomNumbers();
      if (playerBoard.receiveAttack(x, y) == "Miss!") {
        playerBoardDOM
          .querySelector(`td[data-x="${x}"][data-y="${y}"]`)
          .classList.add("missed");
      } else {
        if (playerBoard.grid[y][x].isSunk) {
          playerBoard.shipsRemaining--;
          const shipsRemainingPlayer = document.querySelector(
            ".ship-remaining-player"
          );
          shipsRemainingPlayer.textContent = `Ships remaining: ${playerBoard.shipsRemaining}`;
          shipsRemainingPlayer.classList.add("red-background");
          setTimeout(() => {
            shipsRemainingPlayer.classList.remove("red-background");
          }, 3000);
        }
        playerBoardDOM
          .querySelector(`td[data-x="${x}"][data-y="${y}"]`)
          .classList.add("hit");
        let audio = new Audio(`sounds/hit.mp3`);
        audio.play();
      }
      if (playerBoard.haveAllShipsBeenSunk()) {
        gameOverDialog.querySelector("h2").textContent = "Sorry, you lose!!!";
        gameOverDialog.showModal();
        playGameOver();
      }
    }, 1500);
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

// Function to choose two random numbers
function chooseRandomNumbers() {
  let randomNumber1, randomNumber2;

  // Generate unique random numbers
  do {
    randomNumber1 = Math.floor(Math.random() * 10);
    randomNumber2 = Math.floor(Math.random() * 10);
  } while (chosenPairs.has(`${randomNumber1}-${randomNumber2}`));

  // Add the chosen pair to the set
  chosenPairs.add(`${randomNumber1}-${randomNumber2}`);

  // Return the chosen pair
  return [randomNumber1, randomNumber2];
}

function playAudio() {
  let n = Math.floor(Math.random() * 10) + 1;
  let audio = new Audio(`sounds/son${n}.mp3`);

  audio.play();
}

function playGameOver() {
  let audio = new Audio(`sounds/gameover.mp3`);
  audio.play();
}
