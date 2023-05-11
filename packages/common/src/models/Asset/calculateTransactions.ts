import currency from 'currency.js';
import { AssetTransaction } from 'database/generated/prisma-client';

import { divide } from '../../util';

export type TransactionStats = {
  totalValue: string;
  totalFees: string;
  averagePrice: string | null;
  totalQuantity: string;
};

export function calculateTransactions(
  transactions: AssetTransaction[],
): TransactionStats {
  let totalValue = currency(0);
  let totalFees = currency(0);
  let totalQuantity = currency(0);
  let totalFilledQuantity = currency(0);

  transactions?.forEach((tx) => {
    const price = tx.pricePerUnit ? currency(tx.pricePerUnit) : null;
    const fee = tx.fee ? currency(tx.fee) : currency(0);
    const quantity = tx.quantityFilled
      ? currency(tx.quantityFilled)
      : currency(0);
    const value = price ? quantity.multiply(price) : null;

    totalValue = totalValue.add(value || 0);
    totalFees = totalFees.add(fee);
    totalQuantity = totalQuantity.add(quantity);
    totalFilledQuantity = totalFilledQuantity.add(quantity);
  });

  const averagePrice =
    totalQuantity.value === 0 ? null : divide(totalValue, totalQuantity);

  return {
    totalValue: totalValue.toString(),
    totalFees: totalFees.toString(),
    averagePrice,
    totalQuantity: totalQuantity.toString(),
  };
}
