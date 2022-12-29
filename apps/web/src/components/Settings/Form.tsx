import React, { useEffect } from "react"

import { Autocomplete } from "../Autocomplete"
import { SettingsIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Stack,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { logger } from "common"
import type { Settings } from "database/generated/prisma-client"
import { useSession } from "next-auth/react"
import { FormProvider, useForm } from "react-hook-form"
import { Debug, Drawer, TextInput } from "ui"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

interface SettingsFormProps {
	defaultValues?: Omit<Settings, "createdAt" | "updatedAt">
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

	const methods = useForm<Settings>({
		defaultValues: { userId, ...defaultValues },
	})

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = methods

	/** React hook form memoizes values by default, so when defaultValues changes we reset the form */
	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onFormSubmit = (data: Settings) => {
		if (userId) {
			updatesettings
				.mutateAsync({
					userId,
					id: defaultValues?.id,
					userCurrency: data.userCurrency,
					userLanguage: data.userLanguage,
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
		<FormProvider {...methods}>
			<form
				id="settings-form"
				onSubmit={handleSubmit(onFormSubmit, logger.error)}
			>
				<Stack gap={1}>
					<Autocomplete data={currencies || []} label="Currency" />
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
		</FormProvider>
	)
}

interface SettingsDrawerProps {
	defaultValues?: Settings
}

export const SettingsDrawer = ({ defaultValues }: SettingsDrawerProps) => {
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
