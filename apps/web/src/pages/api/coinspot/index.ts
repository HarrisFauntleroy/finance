import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import type { GetSessionParams } from "next-auth/react"

const BASE_URL = "https://www.coinspot.com.au/api/ro/my"

interface Transaction {
	timestamp: string
}

interface CoinspotAccount {
	/** Including send/receives, buy/sells & withdraw/deposits */
	transactions: Transaction[]
}

/**
 * @swagger
 * /api/coinspot:
 *   get:
 *     description: Returns Coinspot data
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
const coinspot = (
	req: NextApiRequest & GetSessionParams,
	res: NextApiResponse<CoinspotAccount>
) => {
	axios
		.post(BASE_URL, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.COINSPOT_API_KEY}`,
			},
		})
		.then(({ data }) => res.json(data))
		.catch(res.json)
}

export default coinspot
