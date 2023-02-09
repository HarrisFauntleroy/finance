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
import { logger, mapWithMatchingData } from "common"
import { prisma } from "database"
import {
	AccountConnection,
	Asset,
	AssetStatus,
	MarketType,
} from "database/generated/prisma-client"
import dotenv from "dotenv"

dotenv.config()

const endpoint = {
	base: "https://api.swyftx.com.au",
	assets: "/markets/assets/",
	balance: "/user/balance/",
	history: "/history/all/type/assetId/",
	jwt: "https://api.swyftx.com.au/auth/refresh/",
}

const refreshSwyftxToken = async (apiKey: string) => {
	try {
		const data = `apiKey=${apiKey}`
		const response = await axios.post(endpoint.jwt, data, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept-Encoding": "application/json",
			},
		})
		return response.data
	} catch (err) {
		logger.error("refreshSwyftxToken")
	}
}

const fetchFromSwyftx = async (url: string, accessToken: string) => {
	const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY })

	try {
		const response = await axios.get(endpoint.base + url, {
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			data: body,
		})
		return response.data
	} catch (err) {
		logger.error("fetchFromSwyftx")
	}
}

const getSwyftxAccount = async ({
	id,
	apiKey,
}: Secrets): Promise<SwyftxAccount> => {
	const { accessToken }: SwyftxJWT = await refreshSwyftxToken(String(apiKey))

	const assetsList: SwyftxAsset[] = await fetchFromSwyftx(
		endpoint.assets,
		accessToken
	)

	const rawBalance: Balance[] = await fetchFromSwyftx(
		endpoint.balance,
		accessToken
	)

	const transactions: Transaction[] = await fetchFromSwyftx(
		endpoint.history,
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
			Asset,
			"id" | "createdAt" | "updatedAt" | "deletedAt" | "deleted"
		> => {
			return {
				userId: secrets.userId,
				name: name,
				parentId: secrets?.id,
				marketId: `${marketId.toLowerCase()}_${MarketType.CRYPTOCURRENCY}`,
				interestBearingBalance: toDecimal(stakingBalance),
				balance: toDecimal(availableBalance),
				costBasis: toDecimal(0),
				targetBalance: toDecimal(0),
				incomeRate: toDecimal(0),
				realisedGain: toDecimal(0),
				apiKey: "",
				apiSecret: "",
				walletAddress: "",
				account: AccountConnection.NONE,
				institution: "Swyftx",
				category: null,
				categoryId: null,
				status: AssetStatus.ACTIVE,
				currency: "aud",
			}
		}
	)

	const { subAssets } = await prisma.asset.findFirstOrThrow({
		where: {
			userId: secrets.userId,
			account: AccountConnection.SWYFTX,
		},
		select: {
			id: true,
			subAssets: {
				select: {
					id: true,
					marketId: true,
				},
			},
		},
	})

	formattedData?.map(async (crypto) => {
		const existingCrypto = subAssets.find(
			(child) => child.marketId === crypto.marketId
		)

		if (existingCrypto?.id)
			prisma.asset
				.update({
					where: { id: existingCrypto?.id },
					data: crypto,
				})
				.catch(logger.error)
		else
			prisma.asset
				.create({
					data: crypto,
				})
				.catch(logger.error)
	})
}

export const swyftx = () =>
	prisma.asset
		.findMany({
			where: {
				account: AccountConnection.SWYFTX,
				apiKey: { not: null },
				apiSecret: { not: null },
			},
			select: { apiKey: true, apiSecret: true, id: true, userId: true },
		})
		.then((secrets) => {
			const swyftxAccounts = secrets.length
			const progress = new Progress(swyftxAccounts)
			progress.start(`Started updating ${swyftxAccounts} Swyftx accounts`)
			for (const secret of secrets) {
				updateOneUser(secret).then(() => progress.increment())
			}
			progress.stop(`Finished updating ${swyftxAccounts} Swyftx accounts}`)
		})
		.then(() => new Date())
		.catch(() => logger.info("swyftx"))
