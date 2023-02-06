import {
	AccountConnection,
	Asset,
	AssetLabel,
	AssetStatus,
	AssetTransaction,
	Category,
	Prisma,
} from "../generated/prisma-client"
import { Decimal } from "../generated/prisma-client/runtime"
import { prisma } from "./"
import { logger } from "common"

const selectAssetLabel = Prisma.validator<Prisma.AssetLabelSelect>()({
	id: true,
	name: true,
	icon: true,
	assetId: true,
	createdAt: false,
	updatedAt: false,
	deletedAt: false,
	deleted: false,
})

const selectAssetTransaction =
	Prisma.validator<Prisma.AssetTransactionSelect>()({
		id: true,
		timestamp: true,
		pricePerUnit: true,
		baseCurrency: true,
		quantity: true,
		quantityFilled: true,
		fee: true,
		valueInBaseCurrency: true,
		fromAsset: true,
		toAsset: true,
		market: true,
		transactionType: true,
		expiry: true,
		status: true,
		transactionHash: true,
		description: true,
		memo: true,
		relatedAssetId: true,
		relatedAsset: false,
		user: false,
		userId: true,
		createdAt: false,
		updatedAt: false,
		deletedAt: false,
		deleted: false,
	})

const selectSubAsset = Prisma.validator<Prisma.AssetSelect>()({
	id: true,
	name: true,
	institution: true,
	currency: true,
	apiKey: true,
	apiSecret: true,
	walletAddress: true,
	balance: true,
	costBasis: true,
	realisedGain: true,
	targetBalance: true,
	interestBearingBalance: true,
	incomeRate: true,
	account: true,
	labels: { select: selectAssetLabel },
	category: true,
	categoryId: true,
	customCategory: false,
	marketId: true,
	market: false,
	parentId: true,
	parent: false,
	subAssets: true,
	transactions: { select: selectAssetTransaction },
	userId: true,
	status: true,
	createdAt: false,
	updatedAt: false,
	deletedAt: false,
	deleted: false,
})

const selectAsset = Prisma.validator<Prisma.AssetSelect>()({
	id: true,
	name: true,
	institution: true,
	currency: true,
	apiKey: true,
	apiSecret: true,
	walletAddress: true,
	balance: true,
	costBasis: true,
	realisedGain: true,
	targetBalance: true,
	interestBearingBalance: true,
	incomeRate: true,
	account: true,
	labels: { select: selectAssetLabel },
	category: true,
	categoryId: true,
	customCategory: false,
	marketId: true,
	market: false,
	parentId: true,
	parent: false,
	subAssets: { select: selectSubAsset },
	transactions: { select: selectAssetTransaction },
	userId: true,
	status: true,
	createdAt: false,
	updatedAt: false,
	deletedAt: false,
	deleted: false,
})

const assetArgs = Prisma.validator<Prisma.AssetArgs>()({
	select: selectAsset,
})

type AssetsWithSubAssetsAndTransactions = Prisma.AssetGetPayload<
	typeof assetArgs
>

// const assetArgs = Prisma.validator<Prisma.AssetArgs>()({
// 	include: {
// 		transactions: true,
// 		subAssets: true,
// 		labels: true,
// 	},
// })

// type AssetsWithSubAssetsAndTransactions = Prisma.AssetGetPayload<
// 	typeof assetArgs
// >

const userId = "cldcccmxr00064qvd106zmbff"

const assets: AssetsWithSubAssetsAndTransactions[] = [
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
		status: "ACTIVE",
		userId,
		subAssets: [],
		categoryId: null,
		parentId: null,
		transactions: [],
		labels: [],
	},
	{
		id: "seeded-evmos",
		name: "Evmos",
		currency: "aud",
		institution: null,
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		balance: new Decimal(365.77),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		category: Category.CRYPTOCURRENCY,
		marketId: `evmos_${Category.CRYPTOCURRENCY}`,
		status: "ACTIVE",
		userId,
		subAssets: [],
		categoryId: null,
		parentId: null,
		transactions: [],
		labels: [
			{
				id: "seed-label",
				name: "seed-label",
				icon: "seed-label",
				assetId: "seeded-evmos",
			},
		],
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
		status: "ACTIVE",
		userId,
		subAssets: [],
		categoryId: null,
		parentId: null,
		transactions: [],
		labels: [],
		marketId: null,
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
		status: "ACTIVE",
		userId,
		subAssets: [],
		categoryId: null,
		parentId: null,
		transactions: [],
		labels: [],
		marketId: null,
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
		status: "ACTIVE",
		userId,
		categoryId: null,
		marketId: null,
		transactions: [],
		labels: [],
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
				status: "ACTIVE",
				labels: [],
				subAssets: [],
				transactions: [
					{
						id: "seeded-self-wealth-vdhg-tx-1",
						timestamp: new Date("2023-01-23 13:34:15"),
						pricePerUnit: new Decimal(55.7),
						baseCurrency: "aud",
						quantity: new Decimal(16),
						quantityFilled: new Decimal(16),
						fee: new Decimal(9.5),
						valueInBaseCurrency: new Decimal(891.2),
						fromAsset: "aud",
						toAsset: "vdhg",
						market: "asx",
						transactionType: "buy",
						expiry: new Date("2023-01-23T00:00:00.000Z"),
						status: "filled",
						transactionHash: "",
						description: "",
						memo: "",
						relatedAssetId: "cldh9eaoe1166govdd1moep73",
						userId: "cldcccmxr00064qvd106zmbff",
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
		marketId: null,
		subAssets: [],
		categoryId: null,
		status: "ACTIVE",
		parentId: null,
		transactions: [],
		labels: [],
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
		status: "ACTIVE",
		marketId: null,
		transactions: [],
		labels: [],
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
				marketId: null,
				categoryId: null,
				status: "ACTIVE",
				subAssets: [],
				transactions: [],
				labels: [],
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
				marketId: null,
				categoryId: null,
				status: "ACTIVE",
				transactions: [],
				subAssets: [],
				labels: [],
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
				marketId: null,
				categoryId: null,
				status: "ACTIVE",
				transactions: [],
				subAssets: [],
				labels: [],
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
		transactions: [],
		labels: [],
		status: "ACTIVE",
		marketId: null,
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
				marketId: null,
				subAssets: [],
				transactions: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
			},
			{
				parentId: "seeded-macquarie-bank",
				id: "seeded-macquarie-bank-transaction",
				name: "Transaction",
				institution: "Macquarie Bank",
				currency: "aud",
				apiKey: "",
				subAssets: [],
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
				marketId: null,
				transactions: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
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
				subAssets: [],
				transactions: [],
				labels: [],
				marketId: null,
				categoryId: null,
				status: "ACTIVE",
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
				subAssets: [],
				balance: new Decimal(0),
				costBasis: new Decimal(0),
				realisedGain: new Decimal(0),
				targetBalance: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				incomeRate: new Decimal(0),
				account: AccountConnection.NONE,
				category: Category.CASH,
				userId,
				marketId: null,
				transactions: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
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
				marketId: null,
				subAssets: [],
				transactions: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
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
				subAssets: [],
				userId,
				marketId: null,
				transactions: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
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
				marketId: null,
				transactions: [],
				subAssets: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
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
				marketId: null,
				transactions: [],
				subAssets: [],
				labels: [],
				categoryId: null,
				status: "ACTIVE",
			},
		],
	},
]

// Exclude keys from asset
function exclude<User, Key extends keyof User>(
	user: User,
	keys: Key[]
): Omit<User, Key> {
	for (let key of keys) {
		delete user[key]
	}
	return user
}

type IgnoreTypes = "createdAt" | "updatedAt" | "deletedAt" | "deleted"

function upsertTransactions(
	transactions: Omit<AssetTransaction, IgnoreTypes>[]
) {
	return transactions.forEach(
		async (transaction) =>
			await prisma.assetTransaction.upsert({
				where: { id: transaction.id },
				create: transaction,
				update: transaction,
			})
	)
}

function upsertLabels(labels: Omit<AssetLabel, IgnoreTypes>[]) {
	return labels.forEach(
		async (label) =>
			await prisma.assetLabel.upsert({
				where: { id: label.id },
				create: label,
				update: label,
			})
	)
}

function upsertAssets(
	assets: Omit<AssetsWithSubAssetsAndTransactions, IgnoreTypes>[]
) {
	return assets.forEach(async (asset) => {
		const { subAssets, transactions, labels, marketId, ...data } = asset
		await prisma.asset.upsert({
			where: { id: asset.id },
			create: data,
			update: data,
		})
		if (subAssets) {
			upsertAssets(subAssets)
		}
		if (transactions) {
			upsertTransactions(transactions)
		}
		if (labels) {
			upsertLabels(labels)
		}
	})
}

;(async () => {
	logger.info("Starting")
	try {
		logger.info("Attempting to upsertAssets")
		upsertAssets(assets)
	} catch (error) {
		logger.info(`Error while upserting Assets ${error}`)
		process.exit(1)
	} finally {
		logger.info("Finished")
		await prisma.$disconnect()
	}
})()
