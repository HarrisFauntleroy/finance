import axios from "axios"
import { prisma } from "database"
import { MarketType } from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"
import { NextApiRequest, NextApiResponse } from "next"
import { GetSessionParams } from "next-auth/react"

// Define the shape of the response from the Open Exchange Rates API
interface OpenExchangeRatesResponse {
	id: string
	price: unknown
	name: unknown
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
const upsertManyPosts = async (data: OpenExchangeRatesResponse[]) => {
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
				where: { ticker: parsed.ticker },
				create: parsed,
				update: parsed,
			})
		})
	)
}

export const updateExchangeRates = async () => {
	// Get currency names and tickers
	const name = await fetchFromOpenExchangeRates(
		"/currencies.json?show_alternative=false"
	)

	// Get exchange rates using USD as base
	const exchange = await fetchFromOpenExchangeRates(
		"/latest.json?show_alternative=false"
	)

	exchange.disclaimer = undefined
	exchange.license = undefined

	const latest: OpenExchangeRatesResponse[] = Object.entries(
		exchange.rates
	).map(([id, price]) => ({
		id,
		price,
		name: name[id],
	}))

	await upsertManyPosts(latest)
	return latest
}

/**
 * @swagger
 * /api/swyftx/exchangeRates:
 *   get:
 *     description: Returns the latest exchange rates from the Open Exchange Rates API
 *     responses:
 *       200:
 */
const exchangeRates = async (
	_req: NextApiRequest & GetSessionParams,
	res: NextApiResponse<OpenExchangeRatesResponse[]>
) => updateExchangeRates().then(res.json).catch(res.json)

export default exchangeRates
