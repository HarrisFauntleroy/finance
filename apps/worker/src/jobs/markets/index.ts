import { updateMarketsCrypto } from "./crypto"
import { updateExchangeRates } from "./exchangeRates"

export const markets = async () => {
	await updateExchangeRates()
	await updateMarketsCrypto()
}
