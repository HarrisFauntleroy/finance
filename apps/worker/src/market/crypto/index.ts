/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
import { toDecimal } from "../../util"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { CoinGeckoResponse } from "./types"

// Define the MarketUpdater class to handle updating markets
class MarketUpdater {
	// Base currency is USD app-wide
	// Mainly cause I don't want to pay for exchange rates lol
	private baseCurrency = "USD"

	// Method to upsert many markets in the database
	private async upsertManyMarkets(response: CoinGeckoResponse[]) {
		response
			.map((crypto) => ({
				name: crypto.id,
				type: MarketType.CRYPTOCURRENCY,
				ticker: crypto.symbol,
				currency: this.baseCurrency.toLowerCase(),
				price: toDecimal(crypto.current_price).toDecimalPlaces(10),
				priceChange24h: toDecimal(crypto.price_change_24h),
				priceChange24hPercent: toDecimal(crypto.price_change_percentage_24h),
				image: crypto.image,
				marketCap: toDecimal(crypto.market_cap),
				marketCapRank: toDecimal(crypto.market_cap_rank),
				description: "",
			}))
			.forEach((parsed) =>
				prisma.market
					.upsert({
						where: { ticker: parsed.ticker },
						create: parsed,
						update: parsed,
					})
					.then(() => logger.info("success", parsed.ticker))
					.catch(() => logger.error("error", parsed.ticker))
			)
	}

	// Method to fetch and parse JSON data from a given URL
	private async fetchAndParseJSON(url: string) {
		return axios
			.get(url)
			.then((res) => res.data)
			.catch(console.error)
	}

	// Method to update the markets for cryptocurrencies
	public async updateMarketsCrypto() {
		const resultsPerPage = 250
		const pages = 8

		for (let page = pages; page > 0; page--) {
			logger.info("page", page)
			const response = await this.fetchAndParseJSON(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`
			)
			await this.upsertManyMarkets(response)
		}
		return `Crypto: ${new Date()}`
	}
}

const marketUpdater = new MarketUpdater()

export const updateMarketsCrypto = async () => {
	return marketUpdater.updateMarketsCrypto()
}
