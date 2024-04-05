import { displayBoard } from "./game";
import GameBoard from "./gameboard";
import Ship from "./ship";
import "./style.css";

const playerBoard = new GameBoard();
const computerBoard = new GameBoard();

const shipA = new Ship("Odi", 3);

playerBoard.placeShip(shipA, 0, 0, "horizontal");

const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

playerBoard.displayBoard(playerBoardDOM);
computerBoard.displayBoard(computerBoardDOM);

allowPlayerToAttackComputer(computerBoard, computerBoardDOM);

function allowPlayerToAttackComputer(computerBoard, computerBoardDOM) {
  document.addEventListener("DOMContentLoaded", () => {
    const allOpponentCells = Array.from(
      computerBoardDOM.getElementsByClassName("cell")
    );

    allOpponentCells.forEach((element) => {
      element.addEventListener("click", () => {
        if (
          computerBoard.receiveAttack(
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
