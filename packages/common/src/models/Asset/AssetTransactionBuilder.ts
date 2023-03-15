import { AssetTransaction } from "database/generated/prisma-client"

export class AssetTransactionBuilder {
	id: string

	timestamp: Date | null

	pricePerUnit: string | null

	baseCurrency: string

	quantity: string

	quantityFilled: string | null

	fee: string | null

	valueInBaseCurrency: string | null

	fromAsset: string | null

	toAsset: string

	market: string | null

	transactionType: string

	expiry: Date | null

	status: string | null

	transactionHash: string | null

	description: string | null

	memo: string | null

	relatedAssetId: string | null

	userId: string

	createdAt: Date

	updatedAt: Date

	deleted: boolean

	deletedAt: Date | null

	constructor(input: AssetTransaction) {
		this.id = input.id || ""
		this.timestamp = input.timestamp || null
		this.pricePerUnit = input.pricePerUnit || null
		this.baseCurrency = input.baseCurrency || ""
		this.quantity = input.quantity || ""
		this.quantityFilled = input.quantityFilled || null
		this.fee = input.fee || null
		this.valueInBaseCurrency = input.valueInBaseCurrency || null
		this.fromAsset = input.fromAsset || null
		this.toAsset = input.toAsset || ""
		this.market = input.market || null
		this.transactionType = input.transactionType || ""
		this.expiry = input.expiry || null
		this.status = input.status || null
		this.transactionHash = input.transactionHash || null
		this.description = input.description || null
		this.memo = input.memo || null
		this.relatedAssetId = input.relatedAssetId || null
		this.userId = input.userId || ""
		this.createdAt = input.createdAt || new Date()
		this.updatedAt = input.updatedAt || new Date()
		this.deleted = input.deleted || false
		this.deletedAt = input.deletedAt || null
	}
}
