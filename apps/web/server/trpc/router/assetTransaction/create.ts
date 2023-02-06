import { prisma } from "database"
import { date, z } from "zod"
import { decimal } from "~/utils/decimal"

export const createAssetTransactionInput = z.object({
	userId: z.string(),
	timestamp: date().nullable(),
	pricePerUnit: decimal().nullable(),
	baseCurrency: z.string(),
	quantity: decimal(),
	quantityFilled: decimal().nullable(),
	fee: decimal().nullable(),
	valueInBaseCurrency: decimal().nullable(),
	fromAsset: z.string().nullable(),
	toAsset: z.string(),
	market: z.string().nullable(),
	transactionType: z.string(),
	expiry: date().nullable(),
	status: z.string().nullable(),
	transactionHash: z.string().nullable(),
	description: z.string().nullable(),
	memo: z.string().nullable(),
	relatedAssetId: z.string().nullable(),
})

export async function createAssetTransaction(
	data: z.infer<typeof createAssetTransactionInput>
) {
	return await prisma.assetTransaction.create({ data })
}
