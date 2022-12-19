/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
import { toDecimal } from "../../util"
import { CoinGeckoResponse } from "./types"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import fetch from "node-fetch"

class MarketUpdater {
	private baseCurrency = "USD"

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
					.catch(() => logger.error("error", parsed.ticker))
			)
	}

	// Method to update the markets for cryptocurrencies
	public async updateMarketsCrypto() {
		const resultsPerPage = 500
		const pages = 10

		const totalSteps = 10
		let progress = 0

		for (let page = pages; page > 0; page--) {
			progress++
			const percentage = Math.round((progress / totalSteps) * 100)

			logger.info(
				`market/crypto: [${"#".repeat(percentage)}${" ".repeat(
					100 - percentage
				)}] ${percentage}%`
			)
			const response = await axios
				.get(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`
				)
				.then((res) => res.data)

			await this.upsertManyMarkets(response)
		}
		return `Crypto: ${new Date()}`
	}
}

const marketUpdater = new MarketUpdater()

export const updateMarketsCrypto = async () => {
	return marketUpdater.updateMarketsCrypto()
}
