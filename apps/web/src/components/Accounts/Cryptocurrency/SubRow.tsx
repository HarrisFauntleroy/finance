import React, { useMemo, useState } from "react"

import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Stack,
	Text,
} from "@chakra-ui/react"
import type { Row } from "@tanstack/react-table"
import type { CalculatedCryptocurrency } from "common"
import {
	calculateAverageGain,
	calculateAverageLoss,
	calculateBollingerBands,
	calculateEMA,
	calculateMACD,
	calculateRSI,
	calculateStandardDeviation,
	fetchCryptoPriceHistory,
	findSimpleMovingAverage,
	money,
	percentageChange,
} from "common"
import currency from "currency.js"
import { Accordion } from "~/components/Accordion"
import { Debug, inDev } from "~/components/Debug"
import { Grid } from "~/components/Grid"
import { Stat } from "~/components/Stat"

interface TableSubComponentProps<TData> {
	row: Row<TData>
}

function TableSubComponent<TData extends CalculatedCryptocurrency>({
	row: {
		original: {
			// Check if the user should sell or not
			shouldSell,
			// Check if the target balance has been reached or not
			belowTargetBalance,
			// Calculate the average cost
			averageCost,
			// Determine the market to buy or sell from
			marketId,
			balance,
			price,
			market,
			saleable,
			costBasis,
			targetBalance,
			...original
		},
	},
}: TableSubComponentProps<TData>) {
	const [priceHistory, setPriceHistory] = useState([])

	useMemo(() => {
		if (market?.name) {
			// Fetch the last 200 days of price data for the cryptocurrency
			fetchCryptoPriceHistory(market.name, -200).then(setPriceHistory)
		}
	}, [market?.name])

	// Calculate the simple moving average of the price history
	const simpleMovingAverage = findSimpleMovingAverage(priceHistory)

	// Calculate the exponential moving average of the price history over the past 365 days
	const exponentialMovingAverage = calculateEMA(priceHistory, 365)

	// Calculate the moving average convergence divergence of the price history
	const movingAverageConvergenceDivergence = calculateMACD(priceHistory)

	// Calculate the relative strength index of the price history
	const relativeStrengthIndex = calculateRSI(priceHistory)

	// Calculate the average gain of the price history over the past 365 days
	const averageGain = calculateAverageGain(priceHistory, 365)

	// Calculate the average loss of the price history over the past 365 days
	const averageLoss = calculateAverageLoss(priceHistory, 365)

	// Calculate the standard deviation of the price history over the past 365 days
	const standardDeviation = calculateStandardDeviation(priceHistory, 365)

	// Calculate the upper and lower Bollinger bands of the price history
	const bollingerBands = calculateBollingerBands(priceHistory)

	// Calculate the absolute amount of saleable assets
	const amount = Math.abs(money(saleable).value).toFixed(2)

	// Calculate the cost to buy the desired amount
	const costToBuy = money(amount).multiply(money(price))

	// Calculate the final cost basis after buying
	const finalCostBasis = costToBuy.add(String(costBasis))

	// Calculate the final average cost after buying
	const finalaverageCost = finalCostBasis.divide(String(targetBalance))

	// Calculate the average cost or price
	const averageCostOrPrice =
		money(averageCost).value === 0 ? money(price) : money(averageCost)

	const recommendAction = () => {
		// Calculate the return on investment after buying
		const roiAfterBuy = Math.abs(
			percentageChange(finalaverageCost.value, money(averageCost).value)
		).toFixed(2)

		// Use a switch statement to determine the recommended action based on the conditions
		switch (true) {
			// Want to sell and should sell
			case shouldSell && !belowTargetBalance:
				return `Sell ${amount} ${marketId?.toUpperCase()} for ${costToBuy.format()} a gain of ${roiAfterBuy}%`

			// Want to sell but shouldn't sell
			case !(shouldSell || belowTargetBalance):
				return `Sell ${amount} ${marketId?.toUpperCase()} for ${costToBuy.format()} to generate a loss of ${averageCostOrPrice
					.multiply(amount)
					.format()} a loss of ${roiAfterBuy}%`

			// Want to buy and should buy
			case !shouldSell && belowTargetBalance:
				return `Buy ${amount} for ${costToBuy.format()} ${marketId?.toUpperCase()} to decrease your average price of $${averageCost} to ${finalaverageCost.format()} a decrease of ${roiAfterBuy}%`

			// Want to buy but shouldn't buy
			case shouldSell && belowTargetBalance:
				return `Buy ${amount} ${marketId?.toUpperCase()} for ${costToBuy.format()} to increase your average price of $${averageCost} to ${finalaverageCost.format()} an increase of ${roiAfterBuy}%`

			// Catch-all for any unexpected cases
			default:
				return "Something went wrong"
		}
	}

	return (
		<Accordion>
			<AccordionItem maxW="100vw">
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Suggestions
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<Stack>
						<Grid>
							<Stat label="Average Price" value={money(averageCost).format()} />
							<Stat label="Price" value={money(price).format()} />
							<Stat
								label="Gain/Loss from Price %"
								value={`${percentageChange(
									currency(averageCost).value,
									currency(price).value
								).toFixed(2)}%`}
							/>

							<Stat
								label="Simple moving average"
								value={money(simpleMovingAverage).format()}
							/>
							<Stat
								label="Exponential moving average"
								value={money(exponentialMovingAverage).format()}
							/>
							<Stat
								label="Moving average convergence diveregence"
								value={money(movingAverageConvergenceDivergence).format()}
							/>
							<Stat
								label="Relative strength index"
								value={money(relativeStrengthIndex).value.toString()}
							/>
							<Stat
								label="Average price gain over 365d"
								value={money(averageGain).format()}
							/>
							<Stat
								label="Average price loss over 365d"
								value={money(averageLoss).format()}
							/>
							<Stat
								label="Standard deviation"
								value={money(standardDeviation).format()}
							/>
							<Stat
								label="Bollinger bands upper"
								value={money(bollingerBands.upper).format()}
							/>
							<Stat
								label="Bollinger bands lower"
								value={money(bollingerBands.lower).format()}
							/>
							<Stat
								label="Gain/Loss from SMA"
								value={`${percentageChange(
									currency(averageCost).value,
									currency(simpleMovingAverage).value
								).toFixed(2)}
										%`}
							/>
							<Stat
								label="Target / Balance"
								value={(Number(targetBalance) / Number(balance))?.toFixed(2)}
							/>
						</Grid>
						<Text gap={1}>
							{belowTargetBalance ? "Buy" : "Sell"} {amount} to reach your
							target balance of {targetBalance?.toString() || 0}
						</Text>
						<Text gap={1}>{recommendAction()}</Text>
					</Stack>
				</AccordionPanel>
			</AccordionItem>
			{inDev() && (
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Debug data
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<Debug data={original} />
					</AccordionPanel>
				</AccordionItem>
			)}
		</Accordion>
	)
}

export default TableSubComponent
