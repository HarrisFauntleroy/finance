import currency from "currency.js"

interface Transaction {
	[TransactionType: string]: string
	nativeAmount: string
}
interface SumTransactionsIf {
	transactions: Transaction[]
	filterType: string
	filterValue: string
	sumProperty: string
}

/**
 * Sums the values of the specified property in the given transactions that meet the specified condition.
 *
 * @param transactions - The transactions to filter and sum
 * @param filterType - The property to use as the filter condition
 * @param filterValue - The value that the filter property must match
 * @param sumProperty - The property whose values should be summed
 * @returns The sum of the specified property in the filtered transactions
 */
export function sumTransactionsIf({
	transactions,
	filterType,
	filterValue,
	sumProperty,
}: SumTransactionsIf): string {
	let total = 0

	for (const transaction of transactions) {
		if (transaction[filterType] === filterValue) {
			total += currency(transaction[sumProperty]).value
		}
	}

	return total.toString()
}

/**
 * Example
const transactions: Transaction[] = [
	{ TransactionType: "viban_purchase", nativeAmount: "123.45" },
	{ TransactionType: "viban_purchase", nativeAmount: "67.89" },
	{ TransactionType: "other_type", nativeAmount: "12.34" },
]

const result = sumTransactionsIf({
	transactions,
	filterType: "TransactionType",
	filterValue: "viban_purchase",
	sumProperty: "nativeAmount",
})

console.log(result) // Outputs "191.34"
*/
