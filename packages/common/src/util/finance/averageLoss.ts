// Calculate the average loss over a given number of days
// averageLoss = (loss1 + loss2 + ... + lossN) / N
export function calculateAverageLoss(prices: number[], days: number): number {
  // Check if the array of prices is empty
  if (prices.length === 0) {
    return 0;
  }
  // If the number of days is greater than the number of prices, use the number of prices as the number of days
  if (days > prices.length) {
    days = prices.length;
  }

  // Extract the first `days` prices from the `prices` array
  const lossPrices = prices.slice(0, days);

  // Initialize the total loss and the number of days for which there is loss data
  let totalLoss = 0;
  let numberDays = 0;

  // Loop through the `lossPrices` array and compare each price to the next price in the `prices` array
  for (const [index, currentPrice] of lossPrices.entries()) {
    const nextPrice = prices[index + 1];

    // If there is loss data for this day, add it to the total loss and increment the number of days
    if (nextPrice && currentPrice > nextPrice) {
      totalLoss += currentPrice - nextPrice;
      numberDays++;
    }
  }

  // If there are no days with loss data, return 0
  if (numberDays === 0) {
    return 0;
  }

  // Return the average loss by dividing the total loss by the number of days
  return totalLoss / numberDays;
}
