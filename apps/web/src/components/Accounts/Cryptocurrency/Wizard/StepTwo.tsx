import React from "react"

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
} from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

export const StepTwo = () => {
	const { formState, register } = useFormContext()

	return (
		<Stack>
			{/* Target Balance */}
			<FormControl isInvalid={!!formState?.errors.targetBalance}>
				<FormLabel htmlFor="targetBalance">Target Balance</FormLabel>
				<Input
					size="sm"
					id="targetBalance"
					placeholder="Target Balance"
					{...register("targetBalance", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.targetBalance?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Amount Staked */}
			<FormControl isInvalid={!!formState?.errors.interestBearingBalance}>
				<FormLabel htmlFor="interestBearingBalance">Amount Staked</FormLabel>
				<Input
					size="sm"
					id="interestBearingBalance"
					placeholder="Amount Staked"
					{...register("interestBearingBalance", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.interestBearingBalance?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Staking APY */}
			<FormControl isInvalid={!!formState?.errors.rateOfIncome}>
				<FormLabel htmlFor="rateOfIncome">Staking APY</FormLabel>
				<Input
					size="sm"
					id="rateOfIncome"
					placeholder="Staking APY"
					{...register("rateOfIncome", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.rateOfIncome?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
		</Stack>
	)
}
