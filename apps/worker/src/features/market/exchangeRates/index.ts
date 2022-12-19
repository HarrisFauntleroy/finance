import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"
import { Progress } from "../../../util"

interface OpenExchangeRatesResponse {
	id: string
	price: unknown
	name: string
}

const baseUrl = "https://openexchangerates.org/api"

export const fetchFromOpenExchangeRates = (url: string) =>
	axios
		.get(baseUrl + url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${process.env.OER_APP_ID}`,
			},
		})
		.then(({ data }) => data)
		.catch(console.error)

const upsertManyMarkets = (data: OpenExchangeRatesResponse[]) => {
	const progress = new Progress(data.length)

	progress.start()

	Promise.all(
		data.map(async (response) => {
			progress.increment()
			const parsed = {
				name: String(response?.name),
				type: MarketType.CASH,
				ticker: String(response?.id).toLowerCase(),
				currency: String(response?.id),
				price: new Decimal(String(response?.price)),
			}
			await prisma.market
				.upsert({
					where: {
						name_ticker_type: {
							name: parsed.name,
							ticker: parsed.ticker,
							type: MarketType.CASH,
						},
					},
					create: parsed,
					update: parsed,
				})
				.catch(logger.error)
		})
	)
		.then(() => progress.stop())
		.catch(logger.error)
}

export const updateExchangeRates = async () => {
	try {
		logger.info("Starting updateExchangeRates")
		// Get currency names and tickers
		const name = await fetchFromOpenExchangeRates(
			"/currencies.json?show_alternative=false"
		)
		// Get exchange rates using USD as base
		const exchange = await fetchFromOpenExchangeRates(
			"/latest.json?show_alternative=false"
		)

		delete exchange.disclaimer
		delete exchange.license

		const latest: OpenExchangeRatesResponse[] = Object.entries(
			exchange.rates
		).map(([id, price]) => ({
			id,
			price,
			name: name[id],
		}))

		await upsertManyMarkets(latest)
	} catch (error) {
		logger.error(error)
	}
	return `Forex: ${new Date()}`
}

export default updateExchangeRates
