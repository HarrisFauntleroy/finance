import { ExchangeRates } from "../../forex"
import { CryptoComplete, calculateManyCrypto } from "./helpers"
import { CalculatedCryptocurrency } from "./types"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"

const userId = "cl9jeoob60000vd275r4fadgr"

const todaysDate = new Date()

const descriptionText = "Description text"

const testData: CryptoComplete[] = [
	{
		id: "2171207410873287419832471",
		userId: userId,
		displayName: "Bitcoin",
		balance: new Decimal(1),
		currency: "AUD",
		marketId: "BTC",
		targetBalance: new Decimal(1),
		costBasis: new Decimal(25000),
		realisedGain: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		rateOfIncome: new Decimal(0),
		walletAddress: null,
		apiKey: null,
		apiSecret: null,
		createdAt: todaysDate,
		updatedAt: todaysDate,
		accountConnection: null,
		Children: [],
		parentId: "43209489012480234802",
		market: {
			name: "bitcoin",
			ticker: "BTC",
			marketCapRank: new Decimal(1),
			marketCap: new Decimal(1000000),
			priceChange24h: new Decimal(1000),
			priceChange24hPercent: new Decimal(5),
			description: descriptionText,
			createdAt: todaysDate,
			updatedAt: todaysDate,
			currency: "AUD",
			type: MarketType.CRYPTOCURRENCY,
			price: new Decimal(32939.38),
			image: "",
		},
	},
	{
		id: "43209489012480234802",
		userId: userId,
		displayName: "Swyftx",
		balance: new Decimal(0),
		realisedGain: new Decimal(0),
		currency: "AUD",
		marketId: null,
		targetBalance: new Decimal(0),
		costBasis: new Decimal(0),
		interestBearingBalance: new Decimal(0),
		rateOfIncome: new Decimal(0),
		walletAddress: null,
		apiKey: null,
		apiSecret: null,
		createdAt: todaysDate,
		updatedAt: todaysDate,
		accountConnection: "SWYFTX",
		parentId: null,
		market: null,
		Children: [
			{
				id: "2171207410873287419832471",
				userId: userId,
				displayName: "Bitcoin",
				balance: new Decimal(1),
				currency: "AUD",
				marketId: "BTC",
				targetBalance: new Decimal(1),
				costBasis: new Decimal(25000),
				realisedGain: new Decimal(0),
				interestBearingBalance: new Decimal(0),
				rateOfIncome: new Decimal(0),
				walletAddress: null,
				apiKey: null,
				apiSecret: null,
				createdAt: todaysDate,
				updatedAt: todaysDate,
				accountConnection: null,
				parentId: "43209489012480234802",
				market: {
					name: "bitcoin",
					ticker: "btc",
					marketCapRank: new Decimal(1),
					marketCap: new Decimal(1000000),
					priceChange24h: new Decimal(1000),
					priceChange24hPercent: new Decimal(5),
					description: descriptionText,
					createdAt: todaysDate,
					updatedAt: todaysDate,
					currency: "AUD",
					type: MarketType.CRYPTOCURRENCY,
					price: new Decimal(32939.38),
					image: "",
				},
			},
			{
				id: "209184092180928301283901",
				userId: userId,
				displayName: "Ethereum",
				balance: new Decimal(1),
				currency: "AUD",
				marketId: "ETH",
				targetBalance: new Decimal(1),
				costBasis: new Decimal(25000),
				interestBearingBalance: new Decimal(0),
				rateOfIncome: new Decimal(0),
				realisedGain: new Decimal(0),
				walletAddress: null,
				apiKey: null,
				apiSecret: null,
				createdAt: todaysDate,
				updatedAt: todaysDate,
				accountConnection: null,
				parentId: "43209489012480234802",
				market: {
					name: "bitcoin",
					ticker: "ETH",
					marketCapRank: new Decimal(2),
					marketCap: new Decimal(500000),
					priceChange24h: new Decimal(70),
					priceChange24hPercent: new Decimal(7),
					description: descriptionText,
					createdAt: todaysDate,
					updatedAt: todaysDate,
					currency: "AUD",
					type: MarketType.CRYPTOCURRENCY,
					price: new Decimal(3000),
					image: "",
				},
			},
		],
	},
]

const expectedResult: CalculatedCryptocurrency[] = [
	{
		apiKey: null,
		userId: userId,
		apiSecret: null,
		currency: "AUD",
		marketId: "BTC",
		saleable: "0.00",
		price: "32939.38",
		shouldSell: true,
		value: "32939.38",
		walletAddress: null,
		amountStaked: "0.00",
		costBasis: "25000.00",
		saleableValue: "0.00",
		displayName: "Bitcoin",
		averageCost: "25000.00",
		accountConnection: null,
		Children: [],
		balance: new Decimal(1),
		belowTargetBalance: true,
		unrealisedGain: "7939.38",
		realisedGain: new Decimal(0),
		rateOfIncome: new Decimal(0),
		estimatedYearlyReturn: "0.00",
		estimatedStakingYield: "0.00",
		targetBalance: new Decimal(1),
		id: "2171207410873287419832471",
		parentId: "43209489012480234802",
		unrealisedGainPercentage: "0.32",
		interestBearingBalance: new Decimal(0),
		createdAt: todaysDate,
		updatedAt: todaysDate,
		market: {
			image: "",
			ticker: "BTC",
			currency: "AUD",
			name: "bitcoin",
			price: new Decimal(32939.38),
			marketCapRank: new Decimal(1),
			marketCap: new Decimal(1000000),
			type: MarketType.CRYPTOCURRENCY,
			description: descriptionText,
			priceChange24h: new Decimal(1000),
			priceChange24hPercent: new Decimal(5),
			createdAt: todaysDate,
			updatedAt: todaysDate,
		},
	},
	{
		id: "43209489012480234802",
		userId: userId,
		displayName: "Swyftx",
		balance: new Decimal(0),
		realisedGain: new Decimal(0),
		currency: "AUD",
		marketId: null,
		targetBalance: new Decimal(0),
		costBasis: "50000.00",
		interestBearingBalance: new Decimal(0),
		rateOfIncome: new Decimal(0),
		walletAddress: null,
		apiKey: null,
		apiSecret: null,
		createdAt: todaysDate,
		updatedAt: todaysDate,
		accountConnection: "SWYFTX",
		parentId: null,
		market: null,
		estimatedYearlyReturn: "0.00",
		estimatedStakingYield: "0.00",
		unrealisedGain: "-14060.62",
		averageCost: "0.00",
		unrealisedGainPercentage: "-0.56",
		saleable: "0.00",
		saleableValue: "0.00",
		amountStaked: "0.00",
		value: "35939.38",
		price: "0.00",
		belowTargetBalance: false,
		shouldSell: false,
		Children: [
			{
				apiKey: null,
				userId: userId,
				apiSecret: null,
				currency: "AUD",
				marketId: "BTC",
				saleable: "0.00",
				shouldSell: true,
				price: "32939.38",
				value: "32939.38",
				walletAddress: null,
				amountStaked: "0.00",
				costBasis: "25000.00",
				saleableValue: "0.00",
				displayName: "Bitcoin",
				averageCost: "25000.00",
				accountConnection: null,
				balance: new Decimal(1),
				belowTargetBalance: true,
				unrealisedGain: "7939.38",
				rateOfIncome: new Decimal(0),
				realisedGain: new Decimal(0),
				estimatedYearlyReturn: "0.00",
				estimatedStakingYield: "0.00",
				targetBalance: new Decimal(1),
				id: "2171207410873287419832471",
				parentId: "43209489012480234802",
				unrealisedGainPercentage: "0.32",
				interestBearingBalance: new Decimal(0),
				createdAt: todaysDate,
				updatedAt: todaysDate,
				market: {
					image: "",
					ticker: "btc",
					currency: "AUD",
					name: "bitcoin",
					price: new Decimal(32939.38),
					marketCapRank: new Decimal(1),
					marketCap: new Decimal(1000000),
					type: MarketType.CRYPTOCURRENCY,
					description: descriptionText,
					priceChange24h: new Decimal(1000),
					priceChange24hPercent: new Decimal(5),
					createdAt: todaysDate,
					updatedAt: todaysDate,
				},
			},
			{
				interestBearingBalance: new Decimal(0),
				apiKey: null,
				apiSecret: null,
				averageCost: "25000.00",
				accountConnection: null,
				costBasis: "25000.00",
				createdAt: todaysDate,
				currency: "AUD",
				estimatedYearlyReturn: "0.00",
				estimatedStakingYield: "0.00",
				id: "209184092180928301283901",
				market: {
					createdAt: todaysDate,
					currency: "AUD",
					description: descriptionText,
					image: "",
					marketCap: new Decimal(500000),
					marketCapRank: new Decimal(2),
					name: "bitcoin",
					price: new Decimal(3000),
					priceChange24h: new Decimal(70),
					priceChange24hPercent: new Decimal(7),
					ticker: "ETH",
					type: MarketType.CRYPTOCURRENCY,
					updatedAt: todaysDate,
				},
				marketId: "ETH",
				displayName: "Ethereum",
				parentId: "43209489012480234802",
				price: "3000.00",
				unrealisedGainPercentage: "-0.88",
				saleable: "0.00",
				saleableValue: "0.00",
				shouldSell: true,
				amountStaked: "0.00",
				rateOfIncome: new Decimal(0),
				targetBalance: new Decimal(1),
				balance: new Decimal(1),
				realisedGain: new Decimal(0),
				unrealisedGain: "-22000.00",
				updatedAt: todaysDate,
				userId: userId,
				value: "3000.00",
				walletAddress: null,
				belowTargetBalance: true,
			},
		],
	},
]

const exchangeRates: ExchangeRates = {
	AUD: "0.68",
	USD: "1.0",
	EUR: "0.8",
	GBP: "0.6",
	BTC: "0.000047",
	ETH: "0.00062",
}

test("Calculates an accounts total from its sub-accounts. Like crypto imported from an exchange", () => {
	expect(
		calculateManyCrypto({
			data: testData,
			exchangeRates,
			userCurrency: "AUD",
		})
	).toEqual(expectedResult)
})
