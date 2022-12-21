import React from "react"

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Stack,
} from "@chakra-ui/react"
import { AccountConnection } from "database/generated/prisma-client"
import { useFormContext } from "react-hook-form"

export const StepThree = () => {
	const { register, formState } = useFormContext()

	return (
		<Stack>
			{/* Wallet Address */}
			<FormControl isInvalid={!!formState?.errors.walletAddress}>
				<FormLabel htmlFor="walletAddress">Wallet Address</FormLabel>
				<Input
					size="sm"
					id="walletAddress"
					placeholder="Wallet Address"
					{...register("walletAddress")}
				/>
				<FormErrorMessage>
					{formState?.errors.walletAddress?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
			{/* Connection */}
			<FormControl isInvalid={!!formState?.errors.accountConnection}>
				<FormLabel htmlFor="accountConnection">Connection</FormLabel>
				<Select
					id="accountConnection"
					placeholder="Connection"
					{...register("accountConnection")}
				>
					{Object.keys(AccountConnection).map((key) => (
						<option key={`crypto-accountConnection-${key}`}>{key}</option>
					))}
				</Select>
				<FormErrorMessage>
					{formState?.errors.accountConnection?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
			{/* API Key */}
			<FormControl isInvalid={!!formState?.errors.apiKey}>
				<FormLabel htmlFor="apiKey">API Key</FormLabel>
				<Input
					size="sm"
					id="apiKey"
					placeholder="API Key"
					{...register("apiKey")}
				/>
				<FormErrorMessage>
					{formState?.errors.apiKey?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
			{/* API Secret */}
			<FormControl isInvalid={!!formState?.errors.apiSecret}>
				<FormLabel htmlFor="apiSecret">API Secret</FormLabel>
				<Input
					size="sm"
					id="apiSecret"
					placeholder="API Secret"
					{...register("apiSecret")}
				/>
				<FormErrorMessage>
					{formState?.errors.apiSecret?.message?.toString()}
				</FormErrorMessage>
			</FormControl>
		</Stack>
	)
}
