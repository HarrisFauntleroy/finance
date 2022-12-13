import { fetchFromSwyftx } from "."
import { SwyftxAsset, swyftxAssets } from "./assets"
import { refreshSwyftxToken } from "./jwt"
import { NextApiRequest, NextApiResponse } from "next"
import { GetSessionParams } from "next-auth/react"

const baseUrl = "/history/all/type/assetId/"

export interface Transaction {
	amount: number
	trigger: number
	quantity: number
	primaryAsset: number
	quantityAsset: number
	asset: string
	updated: Date
	actionType: string
	status: string
}

/** Current balance & staking balance from Swyftx */
export const swyftxHistory = (accessToken: string) =>
	fetchFromSwyftx(baseUrl, accessToken)

/**
 * @swagger
 * /api/swyftx/history:
 *   get:
 *     description: Returns Swyftx history for current signed in user
 *     responses:
 *       200:
 *         description: all transactions related to an account
 */
const history = async (
	_req: NextApiRequest & GetSessionParams,
	res: NextApiResponse<Transaction[]>
) => {
	// Get access token for Swyftx API
	const { accessToken } = await refreshSwyftxToken(
		String(process.env.SWYFTX_API_KEY)
	)

	// Assets list from Swyftx
	const assetsList: SwyftxAsset[] = await swyftxAssets(accessToken)

	// User history from Swyftx
	const rawHistory: Transaction[] = await fetchFromSwyftx(
		baseUrl,
		accessToken
	).catch(console.error)

	// Map over each item in the raw history array and add some properties to each item
	const historyComplete = rawHistory.map((item) => {
		// Find the matching asset in the assets list
		const matchingAsset = assetsList.find((asset) => asset.id === item.asset)
		// If a matching asset was found
		if (matchingAsset) {
			// Add the displayName and marketId properties to the item
			return {
				...item,
				displayName: matchingAsset.name,
				marketId: matchingAsset.code,
			}
		}
		// If no matching asset was found, return the original item
		return item
	})
	res.json(historyComplete)
}

export default history
