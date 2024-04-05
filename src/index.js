import { displayBoard } from "./game";
import { GameBoard, ComputerGameBoard } from "./gameboard";
import Ship from "./ship";
import "./style.css";

const playerBoard = new GameBoard();
const computerBoard = new ComputerGameBoard();

const shipA = new Ship("Odi", 3);

computerBoard.placeShip(shipA, 0, 0, "horizontal");

const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");

playerBoard.displayBoard(playerBoardDOM);
computerBoard.displayBoard(computerBoardDOM);

computerBoard.allowPlayerToAttackComputer(computerBoardDOM);
