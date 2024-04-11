import { ComputerGameBoard, GameBoard } from "./gameboard";
import Ship from "./ship";
export class Game {
  constructor() {
    this.shipDirectionButton = document.getElementById("ship-direction");
    this.allPlayerShips = [];
    this.playerBoard = new GameBoard();
    this.computerBoard = new ComputerGameBoard();
    // These represents the players GameBoards on the DOM
    this.playerBoardDOM = document.getElementById("player-board");
    this.computerBoardDOM = document.getElementById("computer-board");
    this.currentPlayer = "player";
    this.playerShipNamesAndLength = [
      ["Battleship", 5],
      ["Kraken", 4],
      ["Bull Dog", 3],
      ["Titan", 2],
      ["Warrior", 2],
      ["Tiki", 1],
    ];
  }

  setUpBoards() {
    this.playerBoard.displayBoard(this.playerBoardDOM);
    this.computerBoard.displayBoard(this.computerBoardDOM);
    this.startPlaceShipProcess();
  }

  startPlaceShipProcess() {
    const allCells = this.playerBoardDOM.querySelectorAll(".cell");

    for (const cell of allCells) {
      this.addMouseOverEffectOn(cell);
      this.addMouseOutEffectOn(cell);
      this.addClickEffectOn(cell);
    }
  }
  addMouseOverEffectOn(cell) {
    cell.addEventListener("mouseover", () => {
      if (this.playerShipNamesAndLength.length > 0) {
        const dataX = cell.getAttribute("data-x");
        const dataY = cell.getAttribute("data-y");
        const shipDetails = this.playerShipNamesAndLength[0];
        console.log(shipDetails);
        const shipA = new Ship(...shipDetails);
        shipA.direction = this.shipDirectionButton.textContent;
        if (this.playerBoard.canThisShipBePlacedHere(shipA, dataY, dataX)) {
          let posX = parseInt(dataX);
          let posY = parseInt(dataY);
          for (let i = 0; i < shipA.length; i++) {
            const ship = this.playerBoardDOM.querySelector(
              `td[data-x="${posX}"][data-y="${posY}"]`
            );

            ship.classList.add("ship-position-allowed");
            if (shipA.direction === "horizontal") {
              posX++;
            } else {
              posY++;
            }
          }
        } else {
          let posX = parseInt(dataX);
          let posY = parseInt(dataY);
          for (let i = 0; i < shipA.length; i++) {
            const ship = this.playerBoardDOM.querySelector(
              `td[data-x="${posX}"][data-y="${posY}"]`
            );

            ship.classList.add("ship-position-prohibited");
            if (shipA.direction === "horizontal") {
              posX++;
            } else {
              posY++;
            }
          }
        }
      }
    });
  }
  addMouseOutEffectOn(cell) {
    cell.addEventListener("mouseout", () => {
      if (this.playerShipNamesAndLength.length > 0) {
        const dataX = cell.getAttribute("data-x");
        const dataY = cell.getAttribute("data-y");

        const shipDetails = this.playerShipNamesAndLength[0];
        console.log(shipDetails);
        const shipA = new Ship(...shipDetails);
        shipA.direction = this.shipDirectionButton.textContent;

        if (this.playerBoard.canThisShipBePlacedHere(shipA, dataY, dataX)) {
          let posX = parseInt(dataX);
          let posY = parseInt(dataY);
          for (let i = 0; i < shipA.length; i++) {
            const ship = this.playerBoardDOM.querySelector(
              `td[data-x="${posX}"][data-y="${posY}"]`
            );
            ship.classList.remove("ship-position-allowed");
            if (shipA.direction === "horizontal") {
              posX++;
            } else {
              posY++;
            }
          }
        } else {
          let posX = parseInt(dataX);
          let posY = parseInt(dataY);

          for (let i = 0; i < shipA.length; i++) {
            const ship = this.playerBoardDOM.querySelector(
              `td[data-x="${posX}"][data-y="${posY}"]`
            );

            ship.classList.remove("ship-position-prohibited");
            if (shipA.direction === "horizontal") {
              posX++;
            } else {
              posY++;
            }
          }
        }
      }
    });
  }

  addClickEffectOn(cell) {
    cell.addEventListener("click", () => {
      if (this.playerShipNamesAndLength.length > 0) {
        const dataX = cell.getAttribute("data-x");
        const dataY = cell.getAttribute("data-y");

        // Check if the ship can be placed at the position dataX and dataY
        if (
          this.playerBoard.canThisShipBePlacedHere(
            new Ship(
              ...this.playerShipNamesAndLength[0],
              this.shipDirectionButton.textContent
            ),
            dataY,
            dataX
          )
        ) {
          const shipDetails = this.playerShipNamesAndLength.shift();
          console.log(shipDetails);
          const shipA = new Ship(...shipDetails);
          shipA.direction = this.shipDirectionButton.textContent;

          if (this.playerBoard.canThisShipBePlacedHere(shipA, dataY, dataX)) {
            this.playerBoard.placeShip(shipA, dataX, dataY);
            document.getElementById(
              "ship-left-to-place"
            ).textContent = `${this.playerShipNamesAndLength.length} ships left to place`;

            let posX = parseInt(dataX);
            let posY = parseInt(dataY);
            for (let i = 0; i < shipA.length; i++) {
              const ship = this.playerBoardDOM.querySelector(
                `td[data-x="${posX}"][data-y="${posY}"]`
              );
              ship.classList.remove("ship-position-allowed");

              ship.classList.add("ship");
              if (shipA.direction === "horizontal") {
                posX++;
              } else {
                posY++;
              }

              if (this.playerShipNamesAndLength.length == 0) {
                const playerLabel = document.querySelector(".player-label");
                const computerLabel = document.querySelector(".computer-label");

                playerLabel.textContent = "";
                computerLabel.textContent = "";

                const playerH3 = document.createElement("h3");
                const computerH3 = document.createElement("h3");

                playerH3.textContent = "The computer sinks 1 ship per turn";
                computerH3.textContent =
                  "Click on this board to sink their ships!";
                playerLabel.appendChild(playerH3);
                computerLabel.appendChild(computerH3);

                const shipsRemainingPlayer = document.createElement("div");
                const shipsRemainingComputer = document.createElement("div");

                shipsRemainingPlayer.classList.add("ship-remaining-player");
                shipsRemainingComputer.classList.add("ship-remaining-computer");

                shipsRemainingPlayer.textContent = "Ships remaining 6";
                shipsRemainingComputer.textContent = "Ships remaining 6";

                playerLabel.appendChild(shipsRemainingPlayer);
                computerLabel.appendChild(shipsRemainingComputer);

                this.startGame();
              }
            }
          }
        }
      }
    });
  }

  placeComputerShip() {
    const shipList = [
      new Ship("Titan", 5, "vertical"),
      new Ship("Carl", 4, "horizontal"),
      new Ship("Iyo", 3, "vertical"),
      new Ship("Franck", 2, "horizontal"),
      new Ship("Titan2", 2, "vertical"),
      new Ship("Strong", 1, "horizontal"),
    ];

    shipList.forEach((shipItem) => {
      let placed = false;

      while (!placed) {
        try {
          this.computerBoard.placeShip(shipItem, ...randomPosition());
          placed = true; // Set placed to true if ship placement is successful
        } catch (error) {
          continue;
        }
      }
    });
  }

  startGame() {
    this.placeComputerShip();
    this.computerBoard.allowPlayerToAttackComputer(
      this.computerBoardDOM,
      this.playerBoard,
      this.playerBoardDOM
    );
    // Check if a player has Won
  }
}

function randomPosition() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}
