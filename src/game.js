import { ceil } from "lodash";

class Game {
  constructor() {}
}

export function displayBoard(gameboard, place) {
  // This part of the code should be after the creation of the game boards and before rendering them
  document.addEventListener("DOMContentLoaded", () => {
    let draggedElement;
    // Populate player's board
    gameboard.grid.forEach((row) => {
      const rowElement = document.createElement("tr");
      row.forEach((cell) => {
        const cellElement = document.createElement("td");
        cellElement.classList.add("cell");
        if (cell) {
          cellElement.classList.remove("cell");
          cellElement.classList.add("ship");
          cellElement.draggable = true;
          cellElement.addEventListener("dragstart", (e) => {
            draggedElement = e.target;
          });
        } else {
          cellElement.addEventListener("dragover", (e) => {
            e.preventDefault();
          });
          cellElement.addEventListener("drop", (e) => {
            cellElement.appendChild(draggedElement);
          });
        }

        rowElement.appendChild(cellElement);
      });

      place.appendChild(rowElement);
    });

    // Populate computer's board
  });
}
