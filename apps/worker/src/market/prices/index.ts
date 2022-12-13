/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { Market, MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"
import type { NextApiRequest, NextApiResponse } from "next"
import type { GetSessionParams } from "next-auth/react"

type CoinGeckoStatus = { status: number }

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
	// Loop through all the response items
	for (const crypto of response) {
		try {
			// Create an object containing the data to upsert into the database
			const parsed: Omit<Market, "createdAt" | "updatedAt"> = {
				name: crypto.id,
				type: MarketType.CRYPTOCURRENCY,
				ticker: crypto.symbol,
				currency: baseCurrency.toUpperCase(),
				price: new Decimal(crypto.current_price).toDecimalPlaces(10),
				priceChange24h: new Decimal(crypto.price_change_24h),
				priceChange24hPercent: new Decimal(crypto.price_change_percentage_24h),
				image: crypto.image,
				marketCap: new Decimal(crypto.market_cap),
				marketCapRank: new Decimal(crypto.market_cap_rank),
				description: "",
			}
			// Upsert the data
			await prisma.market.upsert({
				where: { ticker: parsed.ticker },
				create: parsed,
				update: parsed,
			})
		} catch (error) {
			// Log any errors
			logger.error(error)
		}
	}
}

/** Fetch and return json, log failures */
const fetchAndParseJSON = async (url: string) =>
	axios
		.get(url)
		.then((res) => res.data)
		.catch(console.error)

export const updateMarketsCrypto = async () => {
	/** Limit results per page */
	const resultsPerPage = 250
	/** How many pages to fetch */
	const pages = 8

	/** Loop through the page array and fetch results */
	for (let page = pages; page > 0; page--) {
		/** Base url */
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`

		/** Fetch and update */
		await fetchAndParseJSON(url)
			.then(upsertManyPosts)
			.catch(logger.error)
			.then(() => logger.info(page))
	}
}

/**
 * @swagger
 * /api/market/prices:
 *   get:
 *     description: Updates all markets
 *     responses:
 *       200:
 *         description: example
 */
const prices = async (
	_request: NextApiRequest & GetSessionParams,
	res: NextApiResponse<CoinGeckoStatus>
) =>
	updateMarketsCrypto()
		.then(() => res.json({ status: res.statusCode }))
		.catch(res.json)

export default prices
