import { prisma } from "database"
import { z } from "zod"

export const deleteAssetInput = z.object({
	id: z.string(),
})

export async function deleteAsset(id: string) {
	return await prisma.asset.delete({ where: { id } })
}
