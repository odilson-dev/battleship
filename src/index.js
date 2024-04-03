import { displayBoard } from "./game";
import GameBoard from "./gameboard";
import Ship from "./ship";
import "./style.css";

const playerBoard = new GameBoard(10);
const computerBoard = new GameBoard(10);

const shipA = new Ship("Odi", 3);

playerBoard.placeShip(shipA, 0, 0, "horizontal");

const playerBoardPlace = document.getElementById("player-board");
const computerBoardPlace = document.getElementById("computer-board");

displayBoard(playerBoard, playerBoardPlace);
displayBoard(computerBoard, computerBoardPlace);
