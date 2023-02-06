import { prisma } from "database"
import { AccountConnection, Category } from "database/generated/prisma-client"
import { date, z } from "zod"
import { decimal } from "~/utils/decimal"

const CurrencyType = z.string().regex(/^[A-Z]{3}$/)

export const createBudgetTransactionInput = z.object({
	userId: z.string(),
	name: z.string(),
	accountConnection: z.nativeEnum(AccountConnection).nullable(),
	currency: CurrencyType,
	value: decimal(),
	category: z.nativeEnum(Category),
	marketId: z.string().nullable(),
	balance: decimal().default(0),
	targetBalance: decimal().default(0),
	timestamp: date(),
	baseCurrency: z.string(),
	toAsset: z.string(),
	fromAsset: z.string().nullable(),
	costBasis: decimal().default(0),
	interestBearingBalance: decimal().default(0),
	incomeRate: decimal().default(0),
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
