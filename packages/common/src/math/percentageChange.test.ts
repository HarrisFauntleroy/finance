import { percentageChange } from "./percentageChange";

test("Percentage change shows the percent difference between two numbers", () => {
  // Should return a 50% decrease
  expect(percentageChange(2, 1)).toEqual(-50);

  // Should return a 200% increase
  expect(percentageChange(10, 30)).toEqual(200);

  // Should return a 100% decrease
  expect(percentageChange(100, 0)).toEqual(-100);
});
