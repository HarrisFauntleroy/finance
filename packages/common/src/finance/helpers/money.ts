import { ExchangeRates } from "../forex"
import currency from "currency.js"

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

// Calculate the simple moving average of an input array
export function findSimpleMovingAverage(inputArray: (string | number)[]) {
	// Check if the input array exists
	if (!inputArray) {
		return 0
	}

	// Convert all elements in the input array to numbers and sum them
	const sum = inputArray.reduce(
		(accumulator: number, nextValue: string | number) =>
			accumulator + Number(nextValue),
		0
	)

	// Divide the sum by the length of the input array to find the average
	return sum / inputArray.length
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

export function getConversionRate(
	rates: { [key: string]: string },
	fromCurrency: string,
	toCurrency: string
): { value: string; error?: string } {
	const fromRate = rates[fromCurrency.toLowerCase()]
	const toRate = rates[toCurrency.toLowerCase()]

	if (!fromRate) {
		return { value: "0", error: `Invalid from currency: ${fromCurrency}` }
	}

	if (!toRate) {
		return { value: "0", error: `Invalid to currency: ${toCurrency}` }
	}

	return { value: currency(toRate).divide(fromRate).toString() }
}

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

export function convertCurrency({
	exchangeRates,
	fromCurrency,
	toCurrency,
	amount,
}: {
	exchangeRates: ExchangeRates
	fromCurrency: string
	toCurrency: string
	amount?: string
}): currency {
	// get the conversion rate using the provided exchange rates and currencies
	const { value: conversionRate } = getConversionRate(
		exchangeRates,
		fromCurrency,
		toCurrency
	)

	// multiply the amount by the conversion rate and return the result
	return currency(String(amount)).multiply(conversionRate)
}
