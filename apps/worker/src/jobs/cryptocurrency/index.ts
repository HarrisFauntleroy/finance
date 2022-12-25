import { updateEtherumBalances } from "./ethereum"

export const cryptocurrency = async () => {
	await updateEtherumBalances()
}
