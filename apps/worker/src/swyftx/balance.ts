import { fetchFromSwyftx } from "."
import { SwyftxAsset, swyftxAssets } from "./assets"
import { refreshSwyftxToken } from "./jwt"
import { NextApiRequest, NextApiResponse } from "next"
import { GetSessionParams } from "next-auth/react"

const baseUrl = "/user/balance/"

export interface Balance {
	assetId: number
	name: string
	availableBalance: string
	stakingBalance: string
	marketId: string
}

/** Current balance & staking balance from Swyftx */
export const swyftxBalance = (accessToken: string) =>
	fetchFromSwyftx(baseUrl, accessToken)

/**
 * @swagger
 * /api/swyftx/balance:
 *   get:
 *     description: Returns Swyftx balance
 *     responses:
 *       200:
 *         description: all balances related to an account
 */
const balance = async (
	_req: NextApiRequest & GetSessionParams,
	res: NextApiResponse<Balance[]>
) => {
	// Get access token for Swyftx API
	const { accessToken } = await refreshSwyftxToken(
		String(process.env.SWYFTX_API_KEY)
	)

	// Assets list from Swyftx
	const assetsList: SwyftxAsset[] = await swyftxAssets(accessToken)

	// User balance from Swyftx
	const rawBalance: Balance[] = await fetchFromSwyftx(
		baseUrl,
		accessToken
	).catch(console.error)

	// Swyftx returns assets with an ID, so we have to match the assetId to its respective asset from the assetsList
	const balanceComplete = rawBalance.map((item) => {
		// Find the matching asset in the assets list
		const matchingAsset = assetsList.find(
			(asset) => Number(asset.id) === Number(item.assetId)
		)
		// If a matching asset is found, add the display name and market ID to the balance item
		if (matchingAsset) {
			return {
				...item,
				displayName: matchingAsset.name,
				marketId: matchingAsset.code,
			}
		}
		// If no matching asset is found, return the original balance item
		return item
	})
	res.json(balanceComplete)
}

export default balance
