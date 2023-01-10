import { updateCosmosBalances } from "./cosmos"
import { updateEtherumBalances } from "./ethereum"
import { updateHarmonyBalances } from "./harmonyone"

export const cryptocurrency = async () => {
	updateCosmosBalances()
	updateEtherumBalances()
	updateHarmonyBalances()
}
