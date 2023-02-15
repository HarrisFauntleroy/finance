/**
 *
 * @param name of cryptocurrency
 * @param days how many days to fetch price data for
 * @returns (string | number)[] array of prices sorted newest last
 */
export const fetchCryptoPriceHistory = (name: string, days: number) =>
	fetch(
		`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=aud&days=max&interval=daily`
	)
		.then((data) => data.json())
		.then(({ prices }) =>
			prices
				.slice(days)
				.map((item: [timestamp: string, price: string][]) => item[1])
		)

/**
 * @example
 * @description get bitcoins 200d SMA
 * fetchCryptoPriceHistory("bitcoin", -200)
 * .then(findSimpleMovingAverage)
 * .then(console.log);
 */
