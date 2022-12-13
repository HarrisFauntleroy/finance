import { calculateAverageGain } from "./averageGain";

it("should calculate the average gain of the given prices over the given number of days", () => {
  const prices = [1, 2, 3, 4, 5];
  const days = 3;

  expect(calculateAverageGain(prices, days)).toBe(1);
});
