import { createAssetTransactionInput } from "./create"
import { prisma } from "database"
import { z } from "zod"

export const updateAssetTransactionInput = createAssetTransactionInput.extend({
	id: z.string(),
})

export async function updateAssetTransaction(
	data: z.infer<typeof updateAssetTransactionInput>
) {
	return await prisma.assetTransaction.update({ where: { id: data.id }, data })
}
