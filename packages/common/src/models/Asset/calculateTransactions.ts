import currency, { Any } from "currency.js";
import { AssetTransaction } from "database/generated/prisma-client";

import { divide } from "../../util";

export type TransactionStats = {
  totalValue: string;
  totalFees: string;
  averagePrice: string | null;
  totalQuantity: string;
};

function toCurrency(value: Any | null): currency {
  return currency(value || 0);
}

export function calculateTransactions(
  transactions: AssetTransaction[]
): TransactionStats {
  if (!Array.isArray(transactions)) {
    throw new Error("Transactions must be an array");
  }

  const initialTotals = {
    totalValue: toCurrency(0),
    totalFees: toCurrency(0),
    totalQuantity: toCurrency(0),
  };

  const totals = transactions.reduce((acc, tx) => {
    const price = toCurrency(tx.pricePerUnit);
    const fee = toCurrency(tx.fee);
    const quantity = toCurrency(tx.quantityFilled);
    const value = price ? quantity.multiply(price) : toCurrency(0);

    return {
      totalValue: acc.totalValue.add(value),
      totalFees: acc.totalFees.add(fee),
      totalQuantity: acc.totalQuantity.add(quantity),
    };
  }, initialTotals);

  const averagePrice =
    totals.totalQuantity.value === 0
      ? null
      : divide(totals.totalValue, totals.totalQuantity);

  return {
    totalValue: totals.totalValue.toString(),
    totalFees: totals.totalFees.toString(),
    averagePrice,
    totalQuantity: totals.totalQuantity.toString(),
  };
}
