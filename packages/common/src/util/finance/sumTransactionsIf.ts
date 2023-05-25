import currency from "currency.js";

type Transaction = {
  [TransactionType: string]: string;
  nativeAmount: string;
};
type SumTransactionsIf = {
  transactions: Transaction[];
  filterType: string;
  filterValue: string;
  sumProperty: string;
};

export function sumTransactionsIf({
  transactions,
  filterType,
  filterValue,
  sumProperty,
}: SumTransactionsIf): string {
  let total = 0;

  for (const transaction of transactions) {
    if (transaction[filterType] === filterValue) {
      total += currency(transaction[sumProperty]).value;
    }
  }

  return total.toString();
}
