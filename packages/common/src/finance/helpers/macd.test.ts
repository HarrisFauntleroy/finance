import { calculateMACD } from "./macd";

describe("calculateMACD", () => {
  it("should return the moving average convergence divergence of the given prices", () => {
    const prices = [100, 110, 120, 130, 140, 150];
    const expected = 0;
    const actual = calculateMACD(prices);

    expect(actual).toEqual(expected);
  });

  it("should return 0 for an empty array", () => {
    const prices: [] = [];
    const expected = 0;
    const actual = calculateMACD(prices);

    expect(actual).toEqual(expected);
  });

  it("should return the only number in the array for a single-element array", () => {
    const prices = [5];
    const expected = 0;
    const actual = calculateMACD(prices);

    expect(actual).toEqual(expected);
  });
});
