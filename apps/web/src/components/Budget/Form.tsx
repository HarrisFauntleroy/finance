import React, { useEffect } from "react"

import { AddIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { logger } from "common"
import type { Budget } from "database/generated/prisma-client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Debug } from "~/components/Debug"
import Drawer from "~/components/Drawer"
import { TextInput } from "~/components/Form/TextInput"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

type FormProps = {
	mode: "add" | "edit"
	defaultValues?: Budget
}

export const BudgetForm = ({ mode, defaultValues }: FormProps) => {
	/** Toasts */
	const toast = useToast()
	/** Drawer controls */
	const { onClose, isOpen, onOpen } = useDisclosure()

	const session = useSession()

	const userId = session.data?.userId

	/** Create form */
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Budget>({
		defaultValues: { userId, ...defaultValues },
	})

	/** React hook form memoizes values by default, so when defaultValues changes we reset the form */
	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const budgetDelete = trpc.budget.delete.useMutation()

	const budgetAdd = trpc.budget.create.useMutation()

	const budgetEdit = trpc.budget.update.useMutation()

	/** On Submit function for form */
	const onFormSubmit = (submitData: Budget) => {
		if (mode === "edit") {
			budgetEdit
				.mutateAsync({
					id: submitData.id,
					userId: submitData.userId,
					data: submitData,
				})
				.then(() => {
					onClose()
					toast({
						title: `Successfully edited ${submitData.name}`,
						status: "success",
						...defaultToast,
					})
				})
				.catch(logger.error)
		}
		if (mode === "add") {
			budgetAdd
				.mutateAsync(submitData)
				.then(() => {
					onClose()
					toast({
						title: `Successfully created ${submitData.name}`,
						status: "success",
						...defaultToast,
					})
				})
				.catch(logger.error)
		}
	}

	return (
		<>
			<Button onClick={onOpen} leftIcon={<AddIcon />}>
				{mode.toUpperCase()}
			</Button>
			<Drawer onClose={onClose} isOpen={isOpen}>
				<DrawerHeader borderBottomWidth="1px">Cryptocurrency</DrawerHeader>
				<DrawerBody>
					<form
						id="crypto-form"
						onSubmit={handleSubmit(onFormSubmit, logger.error)}
					>
						<Stack gap={1}>
							{/* Display name */}
							<TextInput
								name="name"
								label="Display Name"
								register={register}
								validation={{
									required: "This is required",
								}}
								error={errors?.name?.message}
							/>
							<Debug data={defaultValues} />
						</Stack>
					</form>
				</DrawerBody>
				<DrawerFooter borderTopWidth="1px">
					<ButtonGroup variant="solid" width="100%">
						<Button
							colorScheme="green"
							form="crypto-form"
							type="submit"
							flex={1}
						>
							Submit
						</Button>
						{defaultValues && (
							<Button
								flex={1}
								colorScheme="red"
								onClick={() =>
									window.confirm(
										`Are you sure you want to delete ${defaultValues.name}?`
									) &&
									budgetDelete.mutateAsync({ id: defaultValues.id }).then(() =>
										toast({
											title: `Deleted ${defaultValues.name}!`,
											status: "success",
											duration: 3000,
											isClosable: true,
											position: "bottom-left",
										})
									)
								}
							>
								<Text>Delete</Text>
							</Button>
						)}
						<Button flex={1} onClick={onClose} colorScheme="blue">
							Cancel
						</Button>
					</ButtonGroup>
				</DrawerFooter>
			</Drawer>
		</>
	)
}
