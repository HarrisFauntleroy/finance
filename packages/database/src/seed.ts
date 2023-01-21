import {
	AccountConnection,
	Asset,
	AssetCategory,
	AssetLabel,
	AssetTransaction,
	Category,
	Market,
	User,
} from "../generated/prisma-client"
import { Decimal } from "../generated/prisma-client/runtime"
import { prisma } from "./"

const userId = "clc8t93ur0010j2vdal9xhxo7"

interface Assets extends Asset {
	subAssets: Asset[]
	labels: AssetLabel[]
	transactions: AssetTransaction[]
	customCategory?: AssetCategory
	market?: Market
	parent?: Asset
	user?: User
}

const input: Assets[] = [
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
		currency: "AUD",
		apiKey: "",
		apiSecret: "",
		walletAddress: "",
		value: new Decimal(0),
		valueLastUpdated: new Date(),
		balance: new Decimal(0),
		costBasis: new Decimal(0),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		incomeRate: new Decimal(0),
		account: AccountConnection.NONE,
		labels: [
			{
				id: "asset-label-1",
				name: "Metamask",
				icon: "",
				createdAt: new Date(),
				updatedAt: new Date(),
				deleted: false,
				deletedAt: null,
				assetId: "",
			},
		],
		transactions: [],
		category: Category.CRYPTOCURRENCY,
		categoryId: null,
		// customCategory: {},
		marketId: "ETH",
		// market: {},
		parentId: null,
		// parent: {},
		subAssets: [],
		userId,
		// user: {},
		createdAt: new Date(),
		updatedAt: new Date(),
		deleted: false,
		deletedAt: new Date(),
	},
	// {
	// 	// Cryptocurrency
	// 	name: "Ergo",
	// },
]

;(async () => {
	try {
		await Promise.all(
			input.map((crypto) =>
				prisma.asset.upsert({
					where: {
						id: crypto.id,
					},
					create: {
						...crypto,
						labels: {
							create: crypto.labels,
						},
						transactions: {
							create: crypto.transactions,
						},
						subAssets: {
							create: crypto.subAssets,
						},
						market: {
							create: crypto.market,
						},
						customCategory: {
							create: crypto.customCategory,
						},
						parent: {
							create: crypto.parent,
						},
						user: {
							create: crypto.user,
						},
					},
					update: {
						...crypto,
						labels: {
							create: crypto.labels,
						},
						transactions: {
							create: crypto.transactions,
						},
						subAssets: {
							create: crypto.subAssets,
						},
						market: {
							create: crypto.market,
						},
						customCategory: {
							create: crypto.customCategory,
						},
						parent: {
							create: crypto.parent,
						},
						user: {
							create: crypto.user,
						},
					},
				})
			)
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
})()
