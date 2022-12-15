import React, { Suspense, useEffect } from "react"

import { SettingsIcon } from "@chakra-ui/icons"
import {
	Avatar,
	Button,
	ButtonGroup,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	SkeletonCircle,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import { logger } from "common"
import type { Settings } from "database/generated/prisma-client"
import { useSession } from "next-auth/react"
import { Controller, useForm } from "react-hook-form"
import { Debug } from "~/components/Debug"
import Drawer from "~/components/Drawer"
import { TextInput } from "~/components/Form/TextInput"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

interface SettingsFormProps {
	defaultValues?: Settings
}

export const SettingsForm = ({ defaultValues }: SettingsFormProps) => {
	/** Session from next-auth */
	const session = useSession()
	/** userId */
	const userId = session.data?.userId
	/** Toast controls */
	const toast = useToast()

	const updatesettings = trpc.settings.update.useMutation()

	/** Fetch list of assets for form autocomplete */
	const { data: currencies } = trpc.markets.forex.useQuery()

	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Settings>({
		defaultValues: { userId, ...defaultValues },
	})

	/** React hook form memoizes values by default, so when defaultValues changes we reset the form */
	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onFormSubmit = (data: Settings) => {
		if (userId) {
			updatesettings
				.mutateAsync({
					userId,
					id: defaultValues?.id,
					data,
				})
				.then(() => {
					reset()
					toast({
						title: "Updated!",
						status: "success",
						...defaultToast,
					})
				})
				.catch(() => {
					reset()
					toast({
						title: "Error!",
						status: "error",
						...defaultToast,
					})
				})
		}
	}

	return (
		<form
			id="settings-form"
			onSubmit={handleSubmit(onFormSubmit, logger.error)}
		>
			<Stack gap={1}>
				{/* Ticker */}
				<FormControl isInvalid={!!errors.userCurrency}>
					<FormLabel htmlFor="marketId">Currency</FormLabel>
					<Controller
						control={control}
						name="userCurrency"
						render={({ field }) => (
							<AutoComplete
								filter={(query, optionValue, optionLabel) =>
									optionLabel.includes(query)
								}
								maxSuggestions={10}
								onChange={(value) => {
									field.onChange(value)
								}}
							>
								<AutoCompleteInput
									size="sm"
									placeholder="Currency"
									onChange={field.onChange}
									value={field.value || ""}
									bg={"white.300"}
									_dark={{
										bg: "gray.700",
									}}
								/>
								<AutoCompleteList>
									{currencies?.map((option, oid) => (
										<AutoCompleteItem
											key={`option-${oid}`}
											value={option.ticker}
											textTransform="capitalize"
										>
											<HStack alignItems="center">
												<Suspense fallback={<SkeletonCircle size="10" />}>
													<Avatar
														mr={2}
														size="xs"
														name={option.name}
														src={option.image || option.name}
													/>
												</Suspense>
												<Text>
													{option.name}: ({option.ticker})
												</Text>
											</HStack>
										</AutoCompleteItem>
									))}
								</AutoCompleteList>
							</AutoComplete>
						)}
					/>
					<FormErrorMessage>
						{errors.userCurrency?.message?.toString()}
					</FormErrorMessage>
				</FormControl>

				<TextInput
					label="Language"
					name="userLanguage"
					register={register}
					validation={{
						minLength: {
							value: 3,
							message: "Minimum length should be 3",
						},
					}}
					error={errors.userLanguage?.message}
				/>
				<TextInput
					label="Theme"
					name="preferredColorScheme"
					register={register}
					validation={{
						required: "This is required",
					}}
					error={errors.preferredColorScheme?.message}
				/>
				<ButtonGroup>
					<Button
						type="submit"
						form="settings-form"
						colorScheme="green"
						flex={1}
					>
						Confirm
					</Button>
				</ButtonGroup>
			</Stack>
			<Debug data={defaultValues} />
		</form>
	)
}

interface SettingsDrawerProps {
	defaultValues?: Settings
}

export const SettingsDrawer = ({ defaultValues }: SettingsDrawerProps) => {
	/** Drawer controls */
	const { onClose, isOpen, onOpen } = useDisclosure()

	return (
		<>
			<IconButton
				size="sm"
				icon={<SettingsIcon />}
				onClick={onOpen}
				textTransform="uppercase"
				maxWidth="max-content"
				aria-label={""}
			/>
			<Drawer isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Update settings</DrawerHeader>

					<DrawerBody>
						<SettingsForm defaultValues={defaultValues} />
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<ButtonGroup>
							<Button
								type="submit"
								form="settings-form"
								colorScheme="green"
								flex={1}
							>
								Save
							</Button>
							<Button flex={1} onClick={onClose} colorScheme="blue">
								Cancel
							</Button>
						</ButtonGroup>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
