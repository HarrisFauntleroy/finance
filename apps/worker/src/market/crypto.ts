/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
import { toDecimal } from "../util"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { Market, MarketType } from "database/generated/prisma-client"

type CoinGeckoResponse = {
	id: string
	symbol: string
	name: string
	image: string
	current_price: number
	market_cap: number
	market_cap_rank: number
	fully_diluted_valuation: number
	total_volume: number
	high_24h: number
	low_24h: number
	price_change_24h: number
	price_change_percentage_24h: number
	market_cap_change_24h: number
	market_cap_change_percentage_24h: number
	circulating_supply: number
	total_supply: number
	max_supply: number
	ath: number
	ath_change_percentage: number
	ath_date: string
	atl: 72.61
	atl_change_percentage: number
	atl_date: string
	roi: undefined
	last_updated: string
}

// Base currency is USD app-wide
// Mainly cause I don't want to pay for exchange rates lol
const baseCurrency = "USD"

const upsertManyPosts = async (response: CoinGeckoResponse[]) => {
	for (const crypto of response) {
		try {
			const parsed: Omit<
				Market,
				"createdAt" | "updatedAt" | "deleted" | "deletedAt"
			> = {
				name: crypto.id,
				type: MarketType.CRYPTOCURRENCY,
				ticker: crypto.symbol,
				currency: baseCurrency.toLowerCase(),
				price: toDecimal(crypto.current_price).toDecimalPlaces(10),
				priceChange24h: toDecimal(crypto.price_change_24h),
				priceChange24hPercent: toDecimal(crypto.price_change_percentage_24h),
				image: crypto.image,
				marketCap: toDecimal(crypto.market_cap),
				marketCapRank: toDecimal(crypto.market_cap_rank),
				description: "",
			}
			await prisma.market.upsert({
				where: { ticker: parsed.ticker },
				create: parsed,
				update: parsed,
			})
		} catch (error) {
			logger.error(error)
		}
	}
}

const fetchAndParseJSON = async (url: string) =>
	axios
		.get(url)
		.then((res) => res.data)
		.catch(console.error)

export const updateMarketsCrypto = async () => {
	const resultsPerPage = 250
	const pages = 8

	for (let page = pages; page > 0; page--) {
		const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`

		await fetchAndParseJSON(baseUrl).then(upsertManyPosts)
	}
	return `Crypto: ${new Date()}`
}
