import { Game } from "./game";
import "./style.css";

const dialogElem = document.getElementById("dialog");
const closeBtn = document.querySelector(".close");
const replayBtn = document.querySelector(".replay");
const gameOverDialog = document.getElementById("gameOverDialog");
const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");
closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

replayBtn.addEventListener("click", play);

const battleshipGame = new Game();

battleshipGame.setUpBoards();

function play() {
  gameOverDialog.close();
  playerBoardDOM.textContent = "";
  computerBoardDOM.textContent = "";

  const battle = new Game();

  battle.setUpBoards();
}

const shipDirectionButton = document.getElementById("ship-direction");
// dialogElem.showModal();
shipDirectionButton.addEventListener("click", () => {
  if (shipDirectionButton.textContent == "horizontal") {
    shipDirectionButton.textContent = "vertical";
  } else {
    shipDirectionButton.textContent = "horizontal";
  }
});
