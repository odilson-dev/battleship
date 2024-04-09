import { Game } from "./game";
import "./style.css";

const dialogElem = document.getElementById("dialog");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

const battleshipGame = new Game();

battleshipGame.setUpBoards();

const shipDirectionButton = document.getElementById("ship-direction");
// dialogElem.showModal();
shipDirectionButton.addEventListener("click", () => {
  if (shipDirectionButton.textContent == "horizontal") {
    shipDirectionButton.textContent = "vertical";
  } else {
    shipDirectionButton.textContent = "horizontal";
  }
});
