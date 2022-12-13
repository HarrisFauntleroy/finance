import { calculateEMA } from "./ema";

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

describe("calculateEMA", () => {
  it("should return 0 for an empty array of prices", () => {
    const prices: [] = [];
    const days = 20;
    const expectedResult = 0;

    const result = calculateEMA(prices, days);
    expect(result).toEqual(expectedResult);
  });

  it("should return the correct EMA for an array of prices with a single value", () => {
    const prices = [1];
    const days = 20;
    const expectedResult = 1;

    const result = calculateEMA(prices, days);
    expect(result).toEqual(expectedResult);
  });

  it("should return the correct EMA for an array of prices with multiple values", () => {
    const prices = [1, 2, 3, 4, 5];
    const days = 3;
    const expectedResult = 4;

    const result = calculateEMA(prices, days);
    expect(result).toEqual(expectedResult);
  });
});
