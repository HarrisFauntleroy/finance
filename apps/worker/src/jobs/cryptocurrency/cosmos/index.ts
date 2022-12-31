import { updateCosmosBalances } from "./cosmos"
import { updateOsmosisBalances } from "./osmosis"

export const cosmos = async () => {
	updateCosmosBalances()
	updateOsmosisBalances()
}
