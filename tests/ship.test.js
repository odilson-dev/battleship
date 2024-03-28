import Ship from "../src/ship";

describe("Test whether number of Hits increase correctly after each hits", () => {
  const myShip = new Ship();
  beforeEach(() => {
    myShip.hits();
  });

  it("returns 1", () => {
    expect(myShip.numberOfHits).toEqual(1);
  });

  it("returns 2", () => {
    expect(myShip.numberOfHits).toEqual(2);
  });

  it("returns 3", () => {
    expect(myShip.numberOfHits).toEqual(3);
  });
});
