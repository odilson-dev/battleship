import GameBoard from "./gameboard";
import { ComputerPlayer, Player } from "./player";

class Game {
  constructor() {}
}

export function displayBoard(gameboard, place) {
  // This part of the code should be after the creation of the game boards and before rendering them
  document.addEventListener("DOMContentLoaded", () => {
    // Populate player's board
    gameboard.grid.forEach((row) => {
      const rowElement = document.createElement("tr");
      row.forEach((cell) => {
        const cellElement = document.createElement("td");
        cellElement.classList.add("cell");
        if (cell) {
          cellElement.classList.remove("cell");
          cellElement.classList.add("ship");
        }

        rowElement.appendChild(cellElement);
      });

      place.appendChild(rowElement);
    });

    // Populate computer's board
  });
}
