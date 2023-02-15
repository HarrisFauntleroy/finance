import { prisma } from "database"
import { AccountConnection, Category } from "database/generated/prisma-client"
import { date, z } from "zod"

const CurrencyType = z.string().regex(/^[A-Z]{3}$/)

export const createBudgetTransactionInput = z.object({
	userId: z.string(),
	name: z.string(),
	accountConnection: z.nativeEnum(AccountConnection).nullable(),
	currency: CurrencyType,
	value: z.string(),
	category: z.nativeEnum(Category),
	marketId: z.string().nullable(),
	balance: z.string(),
	targetBalance: z.string(),
	timestamp: date(),
	baseCurrency: z.string(),
	toAsset: z.string(),
	fromAsset: z.string().nullable(),
	costBasis: z.string(),
	interestBearingBalance: z.string(),
	incomeRate: z.string(),
	walletAddress: z.string().nullable(),
	transactionType: z.string(),
	transactionHash: z.string(),
	market: z.string(),
	status: z.string(),
	description: z.string(),
	memo: z.string(),
	apiKey: z.string().nullable(),
	apiSecret: z.string().nullable(),
})

export async function createBudgetTransaction(
	data: z.infer<typeof createBudgetTransactionInput>
) {
	return await prisma.budgetTransaction.create({ data })
}
