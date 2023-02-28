import { prisma } from "database"

export const getUserCurrency = async (userId: string): Promise<string> => {
	const { userCurrency } = await prisma.settings.findFirstOrThrow({
		where: {
			userId,
		},
		select: {
			userCurrency: true,
		},
	})
	return userCurrency
}
