import { calculateStandardDeviation } from "./sd";

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

describe("calculateStandardDeviation", () => {
  it("should return 0 for an empty array of prices", () => {
    const prices: [] = [];
    const days = 5;
    const expectedResult = 0;

    const result = calculateStandardDeviation(prices, days);
    expect(result).toEqual(expectedResult);
  });

  it("should return 0 for an array of prices with only one value", () => {
    const prices = [100];
    const days = 5;
    const expectedResult = 0;

    const result = calculateStandardDeviation(prices, days);
    expect(result).toEqual(expectedResult);
  });

  it("should return the correct standard deviation for an array of prices with multiple values", () => {
    const prices = [100, 105, 110, 115, 120];
    const days = 5;
    const expectedResult = 7.0710678118654755;

    const result = calculateStandardDeviation(prices, days);
    expect(result).toEqual(expectedResult);
  });
});
