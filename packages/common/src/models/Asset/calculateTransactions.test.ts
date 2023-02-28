import { AssetTransactionBuilder } from "./AssetTransactionBuilder"
import { calculateTransactions } from "./calculateTransactions"
import { AssetTransaction } from "database/generated/prisma-client"

describe("calculateTransactions", () => {
	it("should calculate the correct totalValue, totalFees, averagePrice and totalQuantity", () => {
		const transactions: AssetTransaction[] = [
			new AssetTransactionBuilder({
				id: "1",
				timestamp: new Date(),
				pricePerUnit: "1.50",
				baseCurrency: "USD",
				quantity: "10",
				quantityFilled: "10",
				fee: "0.25",
				valueInBaseCurrency: "15",
				fromAsset: null,
				toAsset: "BTC",
				market: null,
				transactionType: "BUY",
				expiry: null,
				status: "COMPLETED",
				transactionHash: null,
				description: null,
				memo: null,
				relatedAssetId: null,
				userId: "123",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
			}),
			new AssetTransactionBuilder({
				id: "2",
				timestamp: new Date(),
				pricePerUnit: "2.00",
				baseCurrency: "USD",
				quantity: "20",
				quantityFilled: "20",
				fee: "0.50",
				valueInBaseCurrency: "40",
				fromAsset: null,
				toAsset: "BTC",
				market: null,
				transactionType: "BUY",
				expiry: null,
				status: "COMPLETED",
				transactionHash: null,
				description: null,
				memo: null,
				relatedAssetId: null,
				userId: "123",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
			}),
		]

		const result = calculateTransactions(transactions)
		expect(result.totalValue).toEqual("55.00")
		expect(result.totalFees).toEqual("0.75")
		expect(result.averagePrice).toEqual("1.83")
		expect(result.totalQuantity).toEqual("30.00")
	})

	// Edge case 1: Test with no transactions
	it("should return 0 for all stats when there are no transactions", () => {
		const transactions: AssetTransaction[] = []
		const result = calculateTransactions(transactions)
		expect(result.totalValue).toEqual("0.00")
		expect(result.totalFees).toEqual("0.00")
		expect(result.averagePrice).toBeNull()
		expect(result.totalQuantity).toEqual("0.00")
	})

	// Edge case 2: Test with a single transaction with quantityFilled and pricePerUnit as 0
	it("should handle a single transaction with quantityFilled and pricePerUnit as 0", () => {
		const transactions: AssetTransaction[] = [
			new AssetTransactionBuilder({
				id: "1",
				timestamp: new Date(),
				pricePerUnit: "0",
				baseCurrency: "USD",
				quantity: "10",
				quantityFilled: "0",
				fee: "0.25",
				valueInBaseCurrency: "0",
				fromAsset: null,
				toAsset: "BTC",
				market: null,
				transactionType: "BUY",
				expiry: null,
				status: "COMPLETED",
				transactionHash: null,
				description: null,
				memo: null,
				relatedAssetId: null,
				userId: "123",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
			}),
		]

		const result = calculateTransactions(transactions)

		expect(result.totalValue).toEqual("0.00")
		expect(result.totalFees).toEqual("0.25")
		expect(result.averagePrice).toBeNull()
		expect(result.totalQuantity).toEqual("0.00")
	})

	// Edge case 3: Test with a single transaction with quantityFilled and pricePerUnit as null
	it("should handle a single transaction with quantityFilled and pricePerUnit as null", () => {
		const transactions: AssetTransaction[] = [
			new AssetTransactionBuilder({
				id: "1",
				timestamp: new Date(),
				pricePerUnit: null,
				baseCurrency: "USD",
				quantity: "10",
				quantityFilled: null,
				fee: "0.25",
				valueInBaseCurrency: null,
				fromAsset: null,
				toAsset: "BTC",
				market: null,
				transactionType: "BUY",
				expiry: null,
				status: "COMPLETED",
				transactionHash: null,
				description: null,
				memo: null,
				relatedAssetId: null,
				userId: "123",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
			}),
		]

		const result = calculateTransactions(transactions)

		expect(result.totalValue).toEqual("0.00")
		expect(result.totalFees).toEqual("0.25")
		expect(result.averagePrice).toBeNull()
		expect(result.totalQuantity).toEqual("0.00")
	})

	// Edge case 4: Test with a single transaction with fee as null
	it("should handle a single transaction with fee as null", () => {
		const transactions: AssetTransaction[] = [
			new AssetTransactionBuilder({
				id: "1",
				timestamp: new Date(),
				pricePerUnit: "1.50",
				baseCurrency: "USD",
				quantity: "10",
				quantityFilled: "10",
				fee: null,
				valueInBaseCurrency: "15",
				fromAsset: null,
				toAsset: "BTC",
				market: null,
				transactionType: "BUY",
				expiry: null,
				status: "COMPLETED",
				transactionHash: null,
				description: null,
				memo: null,
				relatedAssetId: null,
				userId: "123",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
			}),
		]

		const result = calculateTransactions(transactions)

		expect(result.totalValue).toEqual("15.00")
		expect(result.totalFees).toEqual("0.00")
		expect(result.averagePrice).toEqual("1.50")
		expect(result.totalQuantity).toEqual("10.00")
	})

	// Edge case 5: Test with a single transaction with all fields as null

	// Edge case 6: Test with multiple transactions having some values as null or 0

	// Edge case 7: Test with multiple transactions having quantityFilled and pricePerUnit as fractional values

	// Edge case 8: Test with multiple transactions having fee as fractional values

	// Edge case 9: Test with multiple transactions having different baseCurrency

	// Edge case 10: Test with multiple transactions having different transactionTypes
})
