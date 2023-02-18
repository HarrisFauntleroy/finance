import { TRPCError } from "@trpc/server"

export const getAssetById = (id: string) =>
	prisma.asset
		.findUnique({
			where: {
				id,
			},
			include: {
				market: true,
				subAssets: {
					include: {
						market: true,
						user: {
							select: {
								settings: {
									select: {
										userCurrency: true,
									},
								},
							},
						},
					},
				},
				user: {
					select: {
						settings: {
							select: {
								userCurrency: true,
							},
						},
					},
				},
			},
		})
		.catch(() => {
			throw new TRPCError({
				code: "NOT_FOUND",
			})
		})
