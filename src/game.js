class Game {
  constructor() {}
}

export function displayBoard(gameboard, place) {
  // This part of the code should be after the creation of the game boards and before rendering them
  document.addEventListener("DOMContentLoaded", () => {
    let draggedElement;
    // Populate player's board

    let y = 0;
    gameboard.grid.forEach((row) => {
      const rowElement = document.createElement("tr");
      let x = 0;
      row.forEach((cell) => {
        const cellElement = document.createElement("td");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-x", x);
        cellElement.setAttribute("data-y", y);
        x++;

        // if (cell) {
        //   cellElement.classList.remove("cell");
        //   cellElement.classList.add("ship");
        //   cellElement.draggable = true;
        //   cellElement.addEventListener("dragstart", (e) => {
        //     draggedElement = e.target;
        //   });
        // } else {
        //   cellElement.addEventListener("dragover", (e) => {
        //     e.preventDefault();
        //   });
        //   cellElement.addEventListener("drop", (e) => {
        //     cellElement.appendChild(draggedElement);
        //   });
        // }

        rowElement.appendChild(cellElement);
      });
      y++;
      place.appendChild(rowElement);
    });

    // Populate computer's board
  });
}
