import { Prisma } from "database/generated/prisma-client"

type Include = {
	include: Prisma.AssetInclude
	select?: never
}

type Select = {
	include?: never
	select: Prisma.AssetSelect
}

type SelectOrInclude = Select | Include

const defaultOverrides: {
	select?: Prisma.AssetSelect
	include?: Prisma.AssetInclude
	where?: Prisma.AssetWhereInput
} = {
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
}

export const getAssetsByUserId = (
	userId: string,
	overrides?: SelectOrInclude
) => {
	return prisma.asset.findMany({
		where: {
			userId,
			parentId: null,
		},
		...(overrides ? overrides : defaultOverrides),
	})
}
