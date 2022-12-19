/**
 *
 * Fetches and updates prices across all accounts holding cryptocurrencies.
 * We update the database with price so that weekly/monthly snapshots show price of balance at the time of snapshot were current
 *
 */
import { Progress, toDecimal } from "../../../util"
import { CoinGeckoResponse } from "./types"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"

// note: you have to install this dependency manually since it's not required by cli-progress
const colors = require("ansi-colors")

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

		const progress = new Progress(resultsPerPage * pages)

		progress.start()

		const getUrl = (page: number) =>
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.baseCurrency}&order=market_cap_desc&per_page=${resultsPerPage}&page=${page}&sparkline=false`

		for (let page = pages; page > 0; page--) {
			progress.increment(resultsPerPage)
			const markets = await axios.get(getUrl(page)).then(({ data }) => data)

			await this.upsertManyMarkets(markets)
		}
		progress.stop()
		return `Crypto: ${new Date()}`
	}
}

const marketUpdater = new MarketUpdater()

export const updateMarketsCrypto = async () => {
	return marketUpdater.updateMarketsCrypto()
}
