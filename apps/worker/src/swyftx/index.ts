import { toDecimal } from "../util"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import {
	AccountConnection,
	Cryptocurrency,
} from "database/generated/prisma-client"
import { Decimal } from "database/generated/prisma-client/runtime"

const baseSwyftxApiUrl = "https://api.swyftx.com.au"
const assetsUrl = "/markets/assets/"
const balanceUrl = "/user/balance/"
const historyUrl = "/history/all/type/assetId/"
const jwtUrl = "https://api.swyftx.com.au/auth/refresh/"

interface SwyftxAsset {
	id: string
	name: string
	code: string
	minimum_order: string
	price_scale: number
	deposit_enabled: boolean
	withdraw_enabled: boolean
	min_confirmations: number
	min_withdrawal: number
	minimum_order_increment: number
	mining_fee: number
	primary: boolean
	secondary: boolean
}

const swyftxAssets = (accessToken: string) =>
	fetchFromSwyftx(assetsUrl, accessToken)

interface Balance {
	assetId: number
	name: string
	availableBalance: string
	stakingBalance: string
	marketId: string
}

/** Current balance & staking balance from Swyftx */
const swyftxBalance = (accessToken: string) =>
	fetchFromSwyftx(balanceUrl, accessToken)

interface SwyftxJWT {
	accessToken: string
	scope: string
}

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

interface SwyftxAccount {
	id: string
	balance: Balance[]
	history: Transaction[]
}

const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY })

interface Transaction {
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

interface Secrets {
	id: string
	apiKey: string | null
	apiSecret: string | null
}

const fetchFromSwyftx = async (url: string, accessToken: string) => {
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

const swyftxHistory = (accessToken: string) =>
	fetchFromSwyftx(historyUrl, accessToken)

const getSwyftxAccount = async ({
	id,
	apiKey,
}: Secrets): Promise<SwyftxAccount> => {
	const { accessToken }: SwyftxJWT = await refreshSwyftxToken(String(apiKey))

	const assetsList: SwyftxAsset[] = await swyftxAssets(accessToken)

	const rawBalance: Balance[] = await swyftxBalance(accessToken)

	const transactions: Transaction[] = await swyftxHistory(accessToken)

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
		logger.info(`Updating ${secrets.userId}`)
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

		logger.info("formattedData", formattedData)
		formattedData?.map(async (crypto) => {
			const existingCrypto = Children.find(
				(child) => child.marketId === crypto.marketId
			)
			logger.info("existingCrypto", existingCrypto)
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
		.then((secrets) => secrets.map((secret) => updateOneUser(secret)))

	return `Swyftx: ${new Date()}`
}
