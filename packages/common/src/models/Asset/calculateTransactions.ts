import currency from "currency.js";
import { AssetTransaction } from "database/generated/prisma-client";
import { divide } from "../../util";

export type TransactionStats = {
  totalValue: string;
  totalFees: string;
  averagePrice: string | null;
  totalQuantity: string;
};

// Extract the logic for calculating transaction values into a separate function
function calculateTransactionValues(transaction: AssetTransaction) {
  const price = transaction.pricePerUnit
    ? currency(transaction.pricePerUnit)
    : null;
  const fee = transaction.fee ? currency(transaction.fee) : currency(0);
  const quantity = transaction.quantityFilled
    ? currency(transaction.quantityFilled)
    : currency(0);
  const value = price ? quantity.multiply(price) : null;

  return { value, fee, quantity };
}

export function calculateTransactions(
  transactions: AssetTransaction[] = []
): TransactionStats {
  let totalValue = currency(0);
  let totalFees = currency(0);
  let totalQuantity = currency(0);

  // Iterate through each transaction and calculate the necessary values
  for (const transaction of transactions) {
    const { value, fee, quantity } = calculateTransactionValues(transaction);

    totalValue = totalValue.add(value || 0);
    totalFees = totalFees.add(fee);
    totalQuantity = totalQuantity.add(quantity);
  }

  // Calculate average price
  const averagePrice =
    totalQuantity.value === 0 ? null : divide(totalValue, totalQuantity);

  // Return the transaction stats
  return {
    totalValue: totalValue.toString(),
    totalFees: totalFees.toString(),
    averagePrice,
    totalQuantity: totalQuantity.toString(),
  };
}
