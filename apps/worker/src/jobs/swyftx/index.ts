import { Progress, toDecimal } from "../../util"
import {
	Balance,
	Secrets,
	SwyftxAccount,
	SwyftxAsset,
	SwyftxJWT,
	Transaction,
} from "./types"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import {
	AccountConnection,
	Cryptocurrency,
} from "database/generated/prisma-client"

const baseSwyftxApiUrl = "https://api.swyftx.com.au"
const assetsUrl = "/markets/assets/"
const balanceUrl = "/user/balance/"
const historyUrl = "/history/all/type/assetId/"
const jwtUrl = "https://api.swyftx.com.au/auth/refresh/"

const refreshSwyftxToken = async (apiKey: string) => {
	try {
		const myHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
		}
		const data = `apiKey=${apiKey}`

		const response = await axios.post(jwtUrl, data, { headers: myHeaders })
		return response.data
	} catch (error) {
		console.error(error)
	}
}

const fetchFromSwyftx = async (url: string, accessToken: string) => {
	const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY })

	try {
		const response = await axios.get(baseSwyftxApiUrl + url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			data: body,
		})
		return response.data
	} catch (err) {
		// You could log the error message here
		console.error(err)
	}
}

const getSwyftxAccount = async ({
	id,
	apiKey,
}: Secrets): Promise<SwyftxAccount> => {
	const { accessToken }: SwyftxJWT = await refreshSwyftxToken(String(apiKey))

	const assetsList: SwyftxAsset[] = await fetchFromSwyftx(
		assetsUrl,
		accessToken
	)

	const rawBalance: Balance[] = await fetchFromSwyftx(balanceUrl, accessToken)

	const transactions: Transaction[] = await fetchFromSwyftx(
		historyUrl,
		accessToken
	)

	const balance = rawBalance?.map((item) => {
		const matchingAsset = assetsList.find(
			(asset) => Number(asset.id) === Number(item.assetId)
		)
		if (matchingAsset) {
			return {
				...item,
				name: matchingAsset.name,
				marketId: matchingAsset.code,
			}
		}
		return item
	})

	const history = transactions?.map((item) => {
		const matchingAsset = assetsList.find(
			(asset) => Number(asset.id) === Number(item.asset)
		)
		if (matchingAsset) {
			return {
				...item,
				name: matchingAsset.name,
				marketId: matchingAsset.code,
			}
		}
		return item
	})

	return {
		id,
		balance,
		history,
	}
}

export const swyftx = async () => {
	const updateOneUser = async (secrets: {
		apiKey: string | null
		id: string
		userId: string
		apiSecret: string | null
	}) => {
		const accounts = await getSwyftxAccount(secrets)

		const formattedData = accounts?.balance.map(
			({
				name,
				availableBalance,
				stakingBalance,
				marketId,
			}): Omit<
				Cryptocurrency,
				"createdAt" | "updatedAt" | "id" | "currency" | "deleted" | "deletedAt"
			> => {
				return {
					userId: secrets.userId,
					displayName: name,
					parentId: secrets?.id,
					marketId: marketId.toLowerCase(),
					interestBearingBalance: toDecimal(stakingBalance),
					balance: toDecimal(availableBalance),
					costBasis: toDecimal(0),
					targetBalance: toDecimal(0),
					rateOfIncome: toDecimal(0),
					realisedGain: toDecimal(0),
					apiKey: "",
					apiSecret: "",
					walletAddress: "",
					accountConnection: "NONE",
				}
			}
		)

		const { Children } = await prisma.cryptocurrency.findFirstOrThrow({
			where: {
				userId: secrets.userId,
				accountConnection: AccountConnection.SWYFTX,
			},
			select: {
				id: true,
				Children: {
					select: {
						id: true,
						marketId: true,
					},
				},
			},
		})

		formattedData?.map(async (crypto) => {
			const existingCrypto = Children.find(
				(child) => child.marketId === crypto.marketId
			)
			if (existingCrypto?.id)
				prisma.cryptocurrency
					.update({
						where: { id: existingCrypto?.id },
						data: crypto,
					})
					.catch(logger.error)
			else
				prisma.cryptocurrency
					.create({
						data: crypto,
					})
					.catch(logger.error)
		})
	}

	await prisma.cryptocurrency
		.findMany({
			where: { accountConnection: AccountConnection.SWYFTX },
			select: { apiKey: true, apiSecret: true, id: true, userId: true },
		})
		.then((secrets) => {
			const progress = new Progress(secrets.length)
			progress.start()

			const promises = secrets.map((secret) => {
				updateOneUser(secret).then(() => progress.increment())
			})

			Promise.all(promises).then(() => progress.stop())
		})

	return `Swyftx: ${new Date()}`
}
