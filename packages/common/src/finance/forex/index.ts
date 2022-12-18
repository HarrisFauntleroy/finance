import { flattenArrToObj } from "../../helpers"

export type ExchangeRates = { [x: string]: string }

export const getExchangeRates = (
	markets: Record<string, any>[]
): ExchangeRates => {
	const market = markets?.map(({ price, ...rest }) => {
		return {
			...rest,
			price: price.toString(),
		}
	})
	return flattenArrToObj(market, "ticker", "price")
}
