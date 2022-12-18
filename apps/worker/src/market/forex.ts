import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"

// Define the shape of the response from the Open Exchange Rates API
interface OpenExchangeRatesResponse {
	id: string
	price: unknown
	name: string
}

// Define the base URL for the Open Exchange Rates API
const baseUrl = "https://openexchangerates.org/api"

// Default GET request for Open Exchange Rates API
// Adds authorization token to the headers
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

// Upsert many entries
const upsertManyMarkets = async (data: OpenExchangeRatesResponse[]) => {
	// Reshape data and upsert each entry
	await Promise.all(
		data.map(async (response) => {
			const parsed = {
				name: String(response?.name),
				type: MarketType.CASH,
				ticker: String(response?.id).toLowerCase(),
				currency: String(response?.id),
				price: new Decimal(String(response?.price)),
			}
			await prisma.market.upsert({
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
		})
	)
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
		logger.info(name)
		logger.info(exchange)
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
		logger.info("Finished updateExchangeRates")
	} catch (error) {
		logger.error(error)
	}
	return `Forex: ${new Date()}`
}

export default updateExchangeRates
