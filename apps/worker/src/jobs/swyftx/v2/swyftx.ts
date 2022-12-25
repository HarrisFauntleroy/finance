import { Progress, toDecimal } from "../../../util"
import {
	Balance,
	Secrets,
	SwyftxAccount,
	SwyftxAsset,
	SwyftxJWT,
	Transaction,
} from "../types"
import axios from "axios"
import { logger } from "common"
import { prisma } from "database"
import {
	AccountConnection,
	Cryptocurrency,
} from "database/generated/prisma-client"

export class Swyftx {
	private baseUrl: string = "https://api.swyftx.com.au"
	private assetsUrl: string = "/markets/assets/"
	private balanceUrl: string = "/user/balance/"
	private historyUrl: string = "/history/all/type/assetId/"
	private jwtUrl: string = "https://api.swyftx.com.au/auth/refresh/"

	constructor(private apiKey?: string) {}

	private async refreshToken(): Promise<SwyftxJWT> {
		const myHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
		}
		const data = `apiKey=${this.apiKey}`

		try {
			const response = await axios.post(this.jwtUrl, data, {
				headers: myHeaders,
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	private async fetch(url: string, accessToken: string) {
		try {
			const body = JSON.stringify({ apiKey: process.env.SWYFTX_API_KEY })
			const response = await axios.get(this.baseUrl + url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				data: body,
			})
			return response.data
		} catch (err) {
			logger.error(err)
		}
	}

	public async getAssets(accessToken: string): Promise<SwyftxAsset[]> {
		return this.fetch(this.assetsUrl, accessToken)
	}

	public async getBalance(accessToken: string): Promise<Balance[]> {
		return this.fetch(this.balanceUrl, accessToken)
	}

	public async getHistory(accessToken: string): Promise<Transaction[]> {
		return this.fetch(this.historyUrl, accessToken)
	}

	public async getAccount(secrets: Secrets): Promise<SwyftxAccount> {
		const { accessToken }: SwyftxJWT = await this.refreshToken()

		const assetsList: SwyftxAsset[] = await this.getAssets(accessToken)

		const rawBalance: Balance[] = await this.getBalance(accessToken)

		const transactions: Transaction[] = await this.getHistory(accessToken)

		const balance = rawBalance?.map((item) => {
			const matchingAsset = assetsList.find(
				(asset) => asset.id === String(item.assetId)
			)
			return {
				...item,
				name: matchingAsset?.name || "",
				marketId: matchingAsset?.code || "",
			}
		})

		return {
			id: secrets.id,
			balance,
			history: transactions,
		}
	}

	private async updateOneUser(secrets: Secrets): Promise<void> {
		const accounts = await this.getAccount(secrets)
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
					marketId: marketId,
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

	public async updateUsers(): Promise<string> {
		try {
			const secrets = await prisma.cryptocurrency.findMany({
				where: { accountConnection: AccountConnection.SWYFTX },
				select: { apiKey: true, apiSecret: true, id: true, userId: true },
			})
			const progress = new Progress(secrets.length)
			progress.start()
			const promises = secrets.map((secret) => {
				this.updateOneUser(secret).then(() => progress.increment())
			})
			await Promise.all(promises)
			progress.stop()
			return `Swyftx: ${new Date()}`
		} catch (error) {
			logger.error(error)
			return "Error updating users"
		}
	}
}

export const swyftx = async (): Promise<string> => {
	const swyftx = new Swyftx(process.env.SWYFTX_API_KEY)
	return swyftx.updateUsers()
}
