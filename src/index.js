import { displayBoard } from "./game";
import GameBoard from "./gameboard";
import "./style.css";

const playerBoard = new GameBoard(10);
const computerBoard = new GameBoard(10);

const playerBoardPlace = document.getElementById("player-board");
const computerBoardPlace = document.getElementById("computer-board");

displayBoard(playerBoard, playerBoardPlace);
displayBoard(computerBoard, computerBoardPlace);
