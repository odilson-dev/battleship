import { GameBoard } from "../src/gameboard";
import Ship from "../src/ship";

describe("Test a GameBoard object", () => {
  const board = new GameBoard();

  it("Expect the position[0][0] to be falsy", () => {
    expect(board.grid[0][0]).toBeFalsy();
  });

  it("Expect the position[0][0] to be null", () => {
    expect(board.grid[0][0]).toBe(null);
  });
});

describe("Test the method placeShip from GameBoard", () => {
  const shipA = new Ship("Battleship", 3, "horizontal");
  const board = new GameBoard();

  board.placeShip(shipA, 0, 0);

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
  const shipB = new Ship("Warrior", 3, "horizontal");
  const board = new GameBoard();

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
  const shipA = new Ship("Battleship", 3, "horizontal");
  const shipB = new Ship("Warrior", 3, "vertical");
  const board = new GameBoard(10);

  board.placeShip(shipA, 0, 0);
  it("Throw an error when you place a ship on another ship", () => {
    expect(() => board.placeShip(shipB, 0, 0)).toThrow(
      "Another ship is already placed here."
    );
  });
});

describe("Test the method receiveAttack", () => {
  const board = new GameBoard(10);
  const shipC = new Ship("Titan", 3, "horizontal");

  board.placeShip(shipC, 3, 1);
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

describe("Gameboard should be able to report whether or not all of their ships have been sunk.", () => {
  // Create the gameboard
  const board = new GameBoard(10);

  // Create the ships
  const shipA = new Ship("Battleship", 2, "horizontal");
  const shipB = new Ship("Titan", 2, "vertical");

  // Place ships somewhere on the board

  board.placeShip(shipA, 0, 0);
  board.placeShip(shipB, 1, 1);

  // Before each test all the two ships will receive a attack, as the ships length are two, all the ships will sunk on the second
  beforeEach(() => {
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 1);
  });
  it("Return false because all the ships haven't been sunk yet", () => {
    expect(board.haveAllShipsBeenSunk()).toBe(false);
  });

  it("Return true because all the ships have been sunk now", () => {
    expect(board.haveAllShipsBeenSunk()).toBe(true);
  });
});
