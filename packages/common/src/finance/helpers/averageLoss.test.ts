import { calculateAverageLoss } from "./averageLoss";

describe("calculateAverageLoss()", () => {
  it("should calculate the average loss over a given number of days", () => {
    // Create a test array of prices
    const prices = [100, 90, 95, 80, 85, 75, 70, 75, 80, 85, 90];

    // Calculate the average loss for the first 5 days
    const days = 5;
    const expectedAverageLoss = (100 - 90 + 95 - 80 + 85 - 75) / 3;
    const averageLoss = calculateAverageLoss(prices, days);

    // Verify that the function returns the expected average loss
    expect(averageLoss).toEqual(expectedAverageLoss);
  });
});
