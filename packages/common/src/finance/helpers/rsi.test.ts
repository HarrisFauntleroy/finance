import { calculateRSI } from "./rsi";

describe("calculateRSI", () => {
  it("should return 0 for an array of prices with no gains or losses", () => {
    const prices = [100, 100, 100, 100, 100];
    const expected = 100;
    const actual = calculateRSI(prices);

    expect(actual).toEqual(expected);
  });

  it("should return 100 for an array of prices with only gains", () => {
    const prices = [100, 110, 120, 130, 140];
    const expected = 100;
    const actual = calculateRSI(prices);

    expect(actual).toEqual(expected);
  });

  it("should return 0 for an array of prices with only losses", () => {
    const prices = [100, 90, 80, 70, 60, 50];
    const expected = 50;
    const actual = calculateRSI(prices);

    expect(actual).toEqual(expected);
  });

  it("should return the correct RSI for an array of prices with both gains and losses", () => {
    const prices = [100, 110, 90, 80, 90, 100];
    const expected = 50;
    const actual = calculateRSI(prices);

    expect(actual).toEqual(expected);
  });
});
