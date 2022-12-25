import {
	AccountConnection,
	Cryptocurrency,
	User,
} from "../generated/prisma-client"
import { Decimal } from "../generated/prisma-client/runtime"
import { prisma } from "./"

const DEFAULT_USERS = [
	// Add your own user to pre-populate the database with
	{
		name: "Tim Apple",
		email: "tim@apple.com",
	},
] as Array<Partial<User>>

;(async () => {
	try {
		await Promise.all(
			DEFAULT_USERS.map((user) =>
				prisma.user.upsert({
					where: {
						email: user.email!,
					},
					update: {
						...user,
					},
					create: {
						...user,
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

const userId = "clc30162w0010jdt3jumpiiu9"

const input: Omit<
	Cryptocurrency,
	"createdAt" | "updatedAt" | "deletedAt" | "deleted"
>[] = [
	{
		userId,
		id: "cl9ws2f6w0000vdjzw7n9mhbk-btc",
		displayName: "Bitcoin",
		marketId: "btc",
		currency: "aud",
		balance: new Decimal(0.556),
		costBasis: new Decimal(27513),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		rateOfIncome: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		apiKey: null,
		apiSecret: null,
		walletAddress: null,
		parentId: null,
		accountConnection: null,
	},
	{
		userId,
		id: "cl9ws2f6w0000vdjzw7n9mhbk-eth",
		displayName: "Ethereum",
		marketId: "eth",
		currency: "aud",
		balance: new Decimal(0.2965),
		costBasis: new Decimal(808),
		realisedGain: new Decimal(0),
		targetBalance: new Decimal(0),
		rateOfIncome: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		apiKey: null,
		apiSecret: null,
		walletAddress: null,
		parentId: null,
		accountConnection: null,
	},
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-steth",
	// 	displayName: "Lido Staked Ethereum",
	// 	marketId: "steth",
	// 	currency: "aud",
	// 	balance: new Decimal(2.947),
	// 	costBasis: new Decimal(12438),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(0),
	// 	rateOfIncome: new Decimal(0),
	// 	interestBearingBalance: new Decimal(0),
	// 	apiKey: null,
	// 	apiSecret: null,
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: null,
	// },
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-dot",
	// 	displayName: "Polkadot",
	// 	marketId: "dot",
	// 	currency: "aud",
	// 	balance: new Decimal(234.4466),
	// 	costBasis: new Decimal(6582),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(200),
	// 	rateOfIncome: new Decimal(15),
	// 	interestBearingBalance: new Decimal(200),
	// 	apiKey: null,
	// 	apiSecret: null,
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: null,
	// },
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-atom",
	// 	displayName: "Cosmos",
	// 	marketId: "atom",
	// 	currency: "aud",
	// 	balance: new Decimal(65.833),
	// 	costBasis: new Decimal(1157),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(100),
	// 	rateOfIncome: new Decimal(15),
	// 	interestBearingBalance: new Decimal(65),
	// 	apiKey: null,
	// 	apiSecret: null,
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: null,
	// },
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-evmos",
	// 	displayName: "Evmos",
	// 	marketId: "evmos",
	// 	currency: "aud",
	// 	balance: new Decimal(304.486491),
	// 	costBasis: new Decimal(0),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(200),
	// 	rateOfIncome: new Decimal(133.33),
	// 	interestBearingBalance: new Decimal(300),
	// 	apiKey: null,
	// 	apiSecret: null,
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: null,
	// },
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-evmos",
	// 	displayName: "Diffusion.fi",
	// 	marketId: "diff",
	// 	currency: "aud",
	// 	balance: new Decimal(301.574),
	// 	costBasis: new Decimal(0),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(0),
	// 	rateOfIncome: new Decimal(95),
	// 	interestBearingBalance: new Decimal(301.574),
	// 	apiKey: null,
	// 	apiSecret: null,
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: null,
	// },
	// {
	// 	userId,
	// 	id: "cl9ws2f6w0000vdjzw7n9mhbk-swyftx",
	// 	displayName: "Swyftx",
	// 	marketId: null,
	// 	currency: "aud",
	// 	balance: new Decimal(0),
	// 	costBasis: new Decimal(0),
	// 	realisedGain: new Decimal(0),
	// 	targetBalance: new Decimal(0),
	// 	rateOfIncome: new Decimal(0),
	// 	interestBearingBalance: new Decimal(0),
	// 	apiKey: "TAE9u007pzT-IJJiK6GzZ_thROX41GXunTSsfpQbBWInj",
	// 	apiSecret:
	// 		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJrVTRRelF6TlRaQk5rTkNORGsyTnpnME9EYzNOVEZGTWpaRE9USTRNalV6UXpVNE1UUkROUSJ9.eyJodHRwczovL3N3eWZ0eC5jb20uYXUvLWp0aSI6IjA5NGU0NGZlLWY1MWQtNDA2MS1hMmYzLTBhNTJkYWJjZTQ5MCIsImh0dHBzOi8vc3d5ZnR4LmNvbS5hdS8tbWZhX2VuYWJsZWQiOnRydWUsImh0dHBzOi8vc3d5ZnR4LmNvbS5hdS8tY291bnRyeV9uYW1lIjoiQXVzdHJhbGlhIiwiaHR0cHM6Ly9zd3lmdHguY29tLmF1Ly1jaXR5X25hbWUiOiJTeWRuZXkiLCJpc3MiOiJodHRwczovL3N3eWZ0eC5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjEyMWZkM2EwZjk5MTkwMDY5ZjdlNTVkIiwiYXVkIjoiaHR0cHM6Ly9hcGkuc3d5ZnR4LmNvbS5hdS8iLCJpYXQiOjE2NjQ4NTUxNTIsImV4cCI6MTY2NTQ1OTk1MiwiYXpwIjoiRVF3M2ZhQXhPVGhSWVRaeXkxdWxaRGk4REhSQVlkRU8iLCJzY29wZSI6ImFwcC5hY2NvdW50LnRheC1yZXBvcnQgYXBwLmFjY291bnQuYmFsYW5jZSBhcHAuYWNjb3VudC5yZWFkIGFwcC5hZGRyZXNzLnJlYWQgYXBwLmZ1bmRzLnJlYWQgYXBwLm9yZGVycy5yZWFkIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.uZFX8YqMDOCdnHDQggFbbyjurvIQ8opZD-fx5f3hUNXaMfkGfbZ5Dr7l7J1TAhvUwU6xI8a-X2snATOGVLyRlXk714pGZvtPc9gL2ERtIg5oCQW0_Kq43iF3Alyck-Tb99nAsGTv32o5oRX47yhXQeQTXsUeGIkwro12ApLm6N5DH2yO7Z2I8U4oJXuRvOagpPF-3IWWRG-97SldFMavpE1qVstz6ONTtNolVQ5v5O7aaBu-fMT1rRLkSPkhBeu6aL3mDCWhkDX5Nz2TRrBv0e9gw3-SQrowICIEQlUgn1s1sdmwCJ_-OtTHdzDKLhCbftgmllXMu6qMUa5BgUYq-A",
	// 	walletAddress: null,
	// 	parentId: null,
	// 	accountConnection: AccountConnection.SWYFTX,
	// },
]

;(async () => {
	try {
		await Promise.all(
			input.map((crypto) =>
				prisma.cryptocurrency.upsert({
					where: {
						id: crypto.id,
					},
					create: crypto,
					update: crypto,
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
