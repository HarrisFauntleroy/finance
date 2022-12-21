import React from "react"

import {
	// Avatar,
	FormControl,
	FormErrorMessage,
	FormLabel, // HStack,
	Input,
	Stack, // Text,
} from "@chakra-ui/react"
import {
	AutoComplete,
	AutoCompleteInput, // AutoCompleteItem,
	// AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import { Controller, useFormContext } from "react-hook-form"

// import { trpc } from "~/utils/trpc"

export function StepOne() {
	/** Fetch list of assets for form autocomplete */
	// const { data: assetsList } = trpc.markets.listMarkets

	const { control, register, formState } = useFormContext()

	return (
		<Stack>
			{/* displayName */}
			<FormControl isInvalid={!!formState?.errors.displayName}>
				<FormLabel htmlFor="displayName">Display Name</FormLabel>
				<Input
					size="sm"
					id="displayName"
					placeholder="Display Name"
					{...register("displayName", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.displayName?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Ticker */}
			<FormControl isInvalid={!!formState?.errors.marketId}>
				<FormLabel htmlFor="marketId">Ticker</FormLabel>
				<Controller
					control={control}
					name="marketId"
					render={({ field }) => (
						<AutoComplete
							filter={(query, _optionValue, optionLabel) =>
								optionLabel.includes(query)
							}
							maxSuggestions={10}
							onChange={(value) => {
								field.onChange(value)
							}}
						>
							<AutoCompleteInput
								size="sm"
								placeholder="Ticker"
								onChange={field.onChange}
								value={field.value || ""}
								bg={"white.300"}
								_dark={{
									bg: "gray.700",
								}}
							/>
							{/* <AutoCompleteList>
								{assetsList?.map((option, oid) => (
									<AutoCompleteItem
										key={`option-${oid}`}
										value={option.ticker}
										textTransform="capitalize"
									>
										<HStack alignItems="center">
											<Avatar
												mr={2}
												size="xs"
												name={option.name}
												src={option.image || option.name}
											/>
											<Text>
												{option.name}: ({option.ticker})
											</Text>
										</HStack>
									</AutoCompleteItem>
								))}
							</AutoCompleteList> */}
						</AutoComplete>
					)}
				/>
				<FormErrorMessage>
					{formState?.errors.marketId?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* balance */}
			<FormControl isInvalid={!!formState?.errors.balance}>
				<FormLabel htmlFor="balance">balance</FormLabel>
				<Input
					size="sm"
					id="balance"
					placeholder="balance"
					{...register("balance", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.balance?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Currency */}
			<FormControl isInvalid={!!formState?.errors.currency}>
				<FormLabel htmlFor="currency">Currency</FormLabel>
				<Input
					size="sm"
					id="currency"
					placeholder="currency"
					{...register("currency", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.balance?.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Cost Basis */}
			<FormControl isInvalid={!!formState?.errors.costBasis}>
				<FormLabel htmlFor="costBasis">Cost Basis</FormLabel>
				<Input
					size="sm"
					id="costBasis"
					placeholder="Cost Basis"
					{...register("costBasis", {})}
				/>
				<FormErrorMessage>
					{formState?.errors.costBasis?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
		</Stack>
	)
}
