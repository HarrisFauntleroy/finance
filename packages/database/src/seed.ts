import {
	AccountConnection,
	Asset,
	AssetStatus,
	AssetTransaction,
	Category,
	MarketType,
} from "../generated/prisma-client"
import { Decimal } from "../generated/prisma-client/runtime"
import { prisma } from "./"
import { logger } from "common"

const userId = "cldcccmxr00064qvd106zmbff"

const assets = [
	// {
	// 	// Credit Card
	// 	name: "American Express",
	// },
	// {
	// 	// Australian Superannuation
	// 	name: "Australian Retirement Trust",
	// },
	// {
	// 	// Traditional Bank
	// 	name: "Macquarie Bank",
	// 	subAssets: [
	// 		{
	// 			name: "Main",
	// 		},
	// 		{
	// 			name: "Transaction",
	// 		},
	// 		{
	// 			name: "Utilities",
	// 		},
	// 		{
	// 			name: "Medical",
	// 		},
	// 		{
	// 			name: "Travel",
	// 		},
	// 		{
	// 			name: "Gifts",
	// 		},
	// 		{
	// 			name: "Emergency",
	// 		},
	// 		{
	// 			name: "Savings",
	// 		},
	// 	],
	// },
	// {
	// 	// Crypto exchange with support
	// 	name: "Swyftx",
	// },
	// {
	// 	// Cryptocurrency exchange without support (custom category)
	// 	name: "CoinEx",
	// },
	// {
	// 	// Cryptocurrency wallet without support (custom category)
	// 	name: "Ledger",
	// 	subAssets: [
	// 		{
	// 			// Cryptocurrency
	// 			name: "Bitcoin",
	// 		},
	// 	],
	// },
	{
		id: "seeded-ethereum",
		name: "Ethereum",
		currency: "aud",
		institution: null,
		apiKey: "",
		apiSecret: "",
		walletAddress: "0x3F8D494285c17df1889aAd531fFdC42cC28d323F",
		balance: new Decimal(3),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.CRYPTOCURRENCY,
		marketId: `eth_${Category.CRYPTOCURRENCY}`,
		status: AssetStatus.ACTIVE,
		userId,
		categoryId: null,
		parentId: null,
	},
	{
		id: "seeded-amex",
		name: "Amex",
		institution: "American Express",
		currency: "aud",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(-1462.98),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.CREDIT,
		status: AssetStatus.ACTIVE,
		userId,
		categoryId: null,
		parentId: null,
	},
	{
		id: "seeded-australian-retirement-trust",
		name: "ART",
		institution: "Australian Retirement Trust",
		currency: "aud",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(16865),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.SUPERANNUATION,
		status: AssetStatus.ACTIVE,
		userId,
		categoryId: null,
		parentId: null,
	},
	{
		id: "seeded-self-wealth",
		name: "Selfwealth",
		institution: "Selfwealth",
		parentId: null,
		currency: "aud",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(12983.35),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.INVESTMENT,
		status: AssetStatus.ACTIVE,
		userId,
		categoryId: null,
		transactions: [
			{
				id: "",
				timestamp: new Date(),
				pricePerUnit: new Decimal(0),
				baseCurrency: "aud",
				quantity: new Decimal(0),
				quantityFilled: new Decimal(0),
				fee: new Decimal(0),
				valueInBaseCurrency: new Decimal(0),
				fromAsset: "",
				toAsset: "",
				market: "",
				transactionType: "",
				expiry: "",
				transactionHash: "",
				description: "",
				memo: "",
				relatedAssetId: "",
				userId: "",
			},
		],
		subAssets: [
			{
				parentId: "seeded-self-wealth",
				id: "seeded-self-wealth-vdhg",
				name: "VDHG",
				institution: "Vanguard",
				currency: "aud",
				apiKey: "",
				marketId: `vdhg_${Category.INVESTMENT}`,
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(232),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.INVESTMENT,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
				transactions: [
					{
						id: "seeded-self-wealth-vdhg-tx-1",
						timestamp: new Date(),
						pricePerUnit: new Decimal(55),
						baseCurrency: "aud",
						quantity: new Decimal(0),
						quantityFilled: new Decimal(0),
						fee: new Decimal(0),
						valueInBaseCurrency: new Decimal(0),
						fromAsset: "",
						toAsset: "",
						market: "",
						transactionType: "",
						expiry: "",
						transactionHash: "",
						description: "",
						memo: "",
						relatedAssetId: "",
						userId: "",
					},
				],
			},
		],
	},
	{
		id: "seeded-swyftx",
		name: "Swyftx",
		institution: "Swyftx",
		currency: "aud",
		apiKey: "TAE9u007pzT-IJJiK6GzZ_thROX41GXunTSsfpQbBWInj",
		apiSecret:
			"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrVTRRelF6TlRaQk5rTkNORGsyTnpnME9EYzNOVEZGTWpaRE9USTRNalV6UXpVNE1UUkROUSJ9.eyJodHRwczovL3N3eWZ0eC5jb20uYXUvLWp0aSI6IjA5NGU0NGZlLWY1MWQtNDA2MS1hMmYzLTBhNTJkYWJjZTQ5MCIsImh0dHBzOi8vc3d5ZnR4LmNvbS5hdS8tbWZhX2VuYWJsZWQiOnRydWUsImh0dHBzOi8vc3d5ZnR4LmNvbS5hdS8tY291bnRyeV9uYW1lIjoiQXVzdHJhbGlhIiwiaHR0cHM6Ly9zd3lmdHguY29tLmF1Ly1jaXR5X25hbWUiOiJTeWRuZXkiLCJpc3MiOiJodHRwczovL3N3eWZ0eC5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjEyMWZkM2EwZjk5MTkwMDY5ZjdlNTVkIiwiYXVkIjoiaHR0cHM6Ly9hcGkuc3d5ZnR4LmNvbS5hdS8iLCJpYXQiOjE2NjQ4NTUxNTIsImV4cCI6MTY2NTQ1OTk1MiwiYXpwIjoiRVF3M2ZhQXhPVGhSWVRaeXkxdWxaRGk4REhSQVlkRU8iLCJzY29wZSI6ImFwcC5hY2NvdW50LnRheC1yZXBvcnQgYXBwLmFjY291bnQuYmFsYW5jZSBhcHAuYWNjb3VudC5yZWFkIGFwcC5hZGRyZXNzLnJlYWQgYXBwLmZ1bmRzLnJlYWQgYXBwLm9yZGVycy5yZWFkIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.uZFX8YqMDOCdnHDQggFbbyjurvIQ8opZD-fx5f3hUNXaMfkGfbZ5Dr7l7J1TAhvUwU6xI8a-X2snATOGVLyRlXk714pGZvtPc9gL2ERtIg5oCQW0_Kq43iF3Alyck-Tb99nAsGTv32o5oRX47yhXQeQTXsUeGIkwro12ApLm6N5DH2yO7Z2I8U4oJXuRvOagpPF-3IWWRG-97SldFMavpE1qVstz6ONTtNolVQ5v5O7aaBu-fMT1rRLkSPkhBeu6aL3mDCWhkDX5Nz2TRrBv0e9gw3-SQrowICIEQlUgn1s1sdmwCJ_-OtTHdzDKLhCbftgmllXMu6qMUa5BgUYq-A",
		walletAddress: "",
		balance: new Decimal(0),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.SWYFTX,
		category: Category.CRYPTOCURRENCY,
		userId,
		categoryId: null,
		status: AssetStatus.ACTIVE,
		parentId: null,
	},
	{
		id: "seeded-crypto-dot-com",
		name: "Crypto.com",
		institution: "Crypto.com",
		currency: "aud",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(0),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.INVESTMENT,
		userId,
		categoryId: null,
		status: AssetStatus.ACTIVE,
		parentId: null,
		subAssets: [
			{
				parentId: "seeded-crypto-dot-com",
				id: "seeded-crypto-dot-com-app",
				name: "Crypto.com App",
				institution: "Crypto.com",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(450),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CRYPTOCURRENCY,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-crypto-dot-com",
				id: "seeded-crypto-dot-com-exchange",
				name: "Crypto.com Exchange",
				institution: "Crypto.com",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CRYPTOCURRENCY,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-crypto-dot-com",
				id: "seeded-crypto-dot-com-defi-app",
				name: "Crypto.com Defi App",
				institution: "Crypto.com",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CRYPTOCURRENCY,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
		],
	},
	{
		id: "seeded-macquarie-bank",
		name: "Macquarie",
		institution: "Macquarie Bank",
		currency: "aud",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(0),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.CASH,
		userId,
		categoryId: null,
		parentId: null,
		subAssets: [
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-main",
				name: "Main",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(782.5),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-transaction",
				name: "Transaction",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(473.57),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-utilities",
				name: "Utilities",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-medical",
				name: "Medical",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-travel",
				name: "Travel",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(200),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-gifts",
				name: "Gifts",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-emergency",
				name: "Emergency",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(1000),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-savings",
				name: "Savings",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				balance: new Decimal(3000),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				categoryId: null,
				status: AssetStatus.ACTIVE,
			},
		],
	},
]

type OmitFromAsset =
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
	| "deleted"
	| "marketId"

type AssetWithRelatioms = Omit<Asset, OmitFromAsset> & {
	subAssets?: Asset[]
	transactions?: AssetTransaction[]
	marketId?: string | null
}

const upsertTransactions = (transactions: AssetTransaction[]) =>
	transactions.forEach((transaction) => {
		prisma.assetTransaction.upsert({
			where: { id: transaction.id },
			create: transaction,
			update: transaction,
		})
	})

const upsertAssets = (assets: AssetWithRelatioms[]) =>
	assets.forEach((asset) => {
		const { subAssets, transactions, ...data } = asset
		logger.info("Assets...")
		prisma.asset.upsert({
			where: { id: asset.id },
			create: data,
			update: data,
		})
		if (subAssets) {
			logger.info("Sub assets...")
			subAssets.forEach((subAsset) => {
				prisma.asset.upsert({
					where: { id: subAsset.id },
					create: subAsset,
					update: subAsset,
				})
			})
		}
		if (transactions) {
			logger.info("Transactions...")
			upsertTransactions(transactions)
		}
	})

;(async () => {
	try {
		for (const crypto of assets) {
			const { subAssets, ...data } = crypto
			prisma.asset
				.upsert({
					where: { id: crypto.id },
					create: data,
					update: data,
				})
				.then((assetUpsertResult) => {
					crypto.subAssets?.map(async (subData) => {
						await prisma.asset
							.upsert({
								where: { id: subData.id },
								create: { ...subData },
								update: subData,
							})
							.then(() => {
								if (assetUpsertResult.marketId) {
									prisma.market.upsert({
										where: {
											id: assetUpsertResult.marketId,
										},
										create: {
											id: assetUpsertResult.marketId,
											ticker: assetUpsertResult?.marketId?.split("_")[0],
											currency: assetUpsertResult.currency,
											type: MarketType[
												assetUpsertResult?.marketId?.split(
													"_"
												)[1] as keyof typeof MarketType
											],
										},
										update: { id: assetUpsertResult.marketId },
									})
								}
							})
					})
				})
		}
	} catch (error) {
		console.log(`seed: ${error}`)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
})()
