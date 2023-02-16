import { Progress } from "../../../util"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { Category } from "database/generated/prisma-client"

interface OpenExchangeRatesResponse {
	id: string
	price: unknown
	name: string
}

class MarketUpdater {
	private baseUrl = "https://openexchangerates.org/api"

	private parseExchangeRateResponse(
		exchangeRates: OpenExchangeRatesResponse[]
	) {
		return exchangeRates.map(({ name, id, price }) => ({
			name: String(name),
			type: Category.CASH,
			ticker: String(id).toUpperCase(),
			currency: String(id).toUpperCase(),
			price: String(price),
		}))
	}

	private async upsertExchangeRates(
		exchangeRates: OpenExchangeRatesResponse[]
	) {
		const progress = new Progress(exchangeRates.length)
		progress.start("Exchange Rates")
		const parsed = this.parseExchangeRateResponse(exchangeRates)

		for await (const cash of parsed) {
			await prisma.market
				.upsert({
					where: {
						ticker_type: {
							ticker: cash?.ticker,
							type: Category.CASH,
						},
					},
					create: cash,
					update: cash,
				})
				.then(() => progress.increment())
				.catch((err) => logger.error("error", `${cash.ticker} ${err}`))
		}

		progress.stop("Exchange Rates")
	}

	private async fetchFromOpenExchangeRates(url: string) {
		return axios
			.get(this.baseUrl + url, {
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Token ${process.env.OER_APP_ID}`,
				},
			})
			.then(({ data }) => data)
			.catch(logger.error)
	}

	// Method to update the markets for cryptocurrencies
	public async updateExchangeRates() {
		try {
			// Get currency names and tickers
			const name = await this.fetchFromOpenExchangeRates(
				"/currencies.json?show_alternative=false"
			)
			// Get exchange rates using USD as base
			const exchange = await this.fetchFromOpenExchangeRates(
				"/latest.json?show_alternative=false"
			)

			exchange.disclaimer = undefined
			exchange.license = undefined

			const exchangeRates: OpenExchangeRatesResponse[] = Object.entries(
				exchange?.rates || {}
			).map(([id, price]) => ({
				id,
				price,
				name: name[id],
			}))

			await this.upsertExchangeRates(exchangeRates)
		} catch (error) {
			logger.error("Exchange Rates: ", error)
		}

		return new Date()
	}
}

const marketUpdater = new MarketUpdater()

export const updateExchangeRates = async () => {
	return marketUpdater.updateExchangeRates()
}
