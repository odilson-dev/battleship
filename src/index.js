import { Game } from "./game";
import "./style.css";
const soundFiles = require.context("./sounds/", true, /\.(mp3|wav)$/);
const dialogElem = document.getElementById("dialog");
const closeBtn = document.querySelector(".close");
const replayBtn = document.querySelector(".replay");
const gameOverDialog = document.getElementById("gameOverDialog");
const playerBoardDOM = document.getElementById("player-board");
const computerBoardDOM = document.getElementById("computer-board");
const playerLabel = document.querySelector(".player-label");
const computerLabel = document.querySelector(".computer-label");

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

replayBtn.addEventListener("click", start);

dialogElem.showModal();

start();

function start() {
  gameOverDialog.close();
  playerBoardDOM.textContent = "";
  computerBoardDOM.textContent = "";
  playerLabel.textContent = "";
  computerLabel.textContent = "";

  const playerHeading = document.createElement("h3");
  playerHeading.textContent = "Place your pieces";

  const playerBoxDescription = document.createElement("div");
  playerBoxDescription.classList.add("box-description");

  const shipDirectionButton = document.createElement("button");
  shipDirectionButton.setAttribute("id", "ship-direction");
  shipDirectionButton.textContent = "horizontal";

  const shipLeftToPlace = document.createElement("p");
  shipLeftToPlace.setAttribute("id", "ship-left-to-place");
  shipLeftToPlace.textContent = "6 ships left to place";

  playerBoxDescription.appendChild(shipDirectionButton);
  playerBoxDescription.appendChild(shipLeftToPlace);

  playerLabel.appendChild(playerHeading);
  playerLabel.appendChild(playerBoxDescription);

  // Set up the computer label

  const computerHeading = document.createElement("h3");
  computerHeading.textContent = "Waiting...";

  const computerBoxDescription = document.createElement("div");
  computerBoxDescription.classList.add("box-description");

  const computerParagraph = document.createElement("p");
  computerParagraph.textContent = "Waiting for you to place your ships";

  computerBoxDescription.appendChild(computerParagraph);

  computerLabel.appendChild(computerHeading);
  computerLabel.appendChild(computerBoxDescription);

  const battle = new Game();

  battle.setUpBoards();
}

const shipDirectionButton = document.getElementById("ship-direction");

shipDirectionButton.addEventListener("click", () => {
  if (shipDirectionButton.textContent == "horizontal") {
    shipDirectionButton.textContent = "vertical";
  } else {
    shipDirectionButton.textContent = "horizontal";
  }
});
