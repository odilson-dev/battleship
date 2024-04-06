import { ComputerGameBoard, GameBoard } from "./gameboard";
import Ship from "./ship";
import "./style.css";

const shipDirectionButton = document.getElementById("ship-direction");

shipDirectionButton.addEventListener("click", () => {
  if (shipDirectionButton.textContent == "horizontal") {
    shipDirectionButton.textContent = "vertical";
  } else {
    shipDirectionButton.textContent = "horizontal";
  }
});

const playerBoard = new GameBoard();
const computerBoard = new ComputerGameBoard();

const shipA = new Ship("Odi", 3, "horizontal");

const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

playerBoard.displayBoard(playerBoardDOM);
computerBoard.displayBoard(computerBoardDOM);

computerBoard.allowPlayerToAttackComputer(computerBoardDOM);

improveHowUserPlaceShips();

function improveHowUserPlaceShips() {
  document.addEventListener("DOMContentLoaded", () => {
    const allCells = playerBoardDOM.querySelectorAll(".cell");

    for (const cell of allCells) {
      cell.addEventListener("mouseover", () => {
        const dataX = cell.getAttribute("data-x");
        const dataY = cell.getAttribute("data-y");
        playerBoard.canThisShipBePlacedHere(shipA, dataY, dataX);
      });
    }
  });
}
