import Ship from "../src/ship";

describe("Test whether number of Hits increase correctly after each hits", () => {
  const myShip = new Ship("Battleship", 3, "direction");
  beforeEach(() => {
    myShip.hit();
  });

  it("returns 1", () => {
    expect(myShip.hits).toEqual(1);
  });

  it("returns 2", () => {
    expect(myShip.hits).toEqual(2);
  });

  it("returns 3", () => {
    expect(myShip.hits).toEqual(3);
  });
});

describe("Test the isSunk method", () => {
  const myShip = new Ship("Battleship", 2, "direction");

  beforeEach(() => {
    myShip.hit();
  });

  it("Should return false", () => {
    expect(myShip.isSunk).toBe(false);
  });

  it("Should return true, because the length of myShip is 0, therefore it sinks", () => {
    expect(myShip.isSunk).toBe(true);
  });
});
