import GameBoard from "../src/gameboard";
import Ship from "../src/ship";

describe("Test a GameBoard object", () => {
  const board = new GameBoard(10);

  it("Expect the position[0][0] to be falsy", () => {
    expect(board.grid[0][0]).toBeFalsy();
  });

  it("Expect the position[0][0] to be null", () => {
    expect(board.grid[0][0]).toBe(null);
  });
});

describe("Test the method placeShip from GameBoard", () => {
  const shipA = new Ship("Battleship", 3);
  const board = new GameBoard(10);

  board.placeShip(shipA, 0, 0, "horizontal");

  it("Expect the position[0][0] to be truthy", () => {
    expect(board.grid[0][0]).toBeTruthy();
  });

  it("Expect the position[0][0] to be null", () => {
    expect(board.grid[0][0]).not.toBe(null);
  });

  it("Expect a ship called Battleship is found at the position[0][0]", () => {
    expect(board.grid[0][0].name).toBe("Battleship");
  });

  it("Expect a ship called Battleship is found at the position[0][1]", () => {
    expect(board.grid[0][1].name).toBe("Battleship");
  });

  it("Expect a ship called Battleship is found at the position[0][2]", () => {
    expect(board.grid[0][2].name).toBe("Battleship");
  });

  it("Expect the square after the ship to be empty or null", () => {
    expect(board.grid[0][3]).toBe(null);
  });

  it("Expect the first row to contain a ship", () => {
    expect(board.grid[0]).toContain(shipA);
  });
});

describe("We try to place a ship out of bound", () => {
  const shipB = new Ship("Warrior", 3);
  const board = new GameBoard(10);

  it("Throw an error when the ship placement is out of bounds", () => {
    expect(() => board.placeShip(shipB, 10, 0, "vertical")).toThrow(
      "Ship placement out of bounds."
    );
  });

  it("Throw an error when the ship placement is out of bounds", () => {
    expect(() => board.placeShip(shipB, 4, 11, "vertical")).toThrow(
      "Ship placement out of bounds."
    );
  });
});

describe("I try to add a ship on another ship", () => {
  const shipA = new Ship("Battleship", 3);
  const shipB = new Ship("Warrior", 3);
  const board = new GameBoard(10);

  board.placeShip(shipA, 0, 0, "horizontal");
  it("Throw an error when you place a ship on another ship", () => {
    expect(() => board.placeShip(shipB, 0, 0, "vertical")).toThrow(
      "Another ship is already placed here."
    );
  });
});

describe("Test the method receiveAttack", () => {
  const board = new GameBoard(10);
  const shipC = new Ship("Titan", 3);

  board.placeShip(shipC, 3, 1, "horizontal");
  it("Return value match miss when no ship is hit", () => {
    expect(board.receiveAttack(2, 1)).toMatch(/Miss!/);
  });

  it("Return value match Hit on when a ship is hit", () => {
    expect(board.receiveAttack(3, 1)).toMatch(/Hit on/);
  });

  it("Throw an error when we attack somewhere which is out of the bounds", () => {
    expect(() => board.receiveAttack(-1, 45)).toThrow("Attack out of bounds.");
  });
});
