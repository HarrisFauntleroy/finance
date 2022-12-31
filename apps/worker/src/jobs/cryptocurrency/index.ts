import { cosmos } from "./cosmos"
import { updateEtherumBalances } from "./ethereum"
import { updateHarmonyBalances } from "./harmonyone"

export const cryptocurrency = async () => {
	cosmos()
	updateEtherumBalances()
	updateHarmonyBalances()
}
