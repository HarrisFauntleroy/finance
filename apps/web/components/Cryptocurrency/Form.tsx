import React, { useEffect } from "react"

import { StepOne } from "./Wizard/StepOne"
import { StepThree } from "./Wizard/StepThree"
import { StepTwo } from "./Wizard/StepTwo"
import { AddIcon, EditIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	IconButton,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { logger } from "common"
import type { Cryptocurrency } from "database/generated/prisma-client"
import { FormProvider, useForm } from "react-hook-form"
import { BsPerson } from "react-icons/bs"
import { FiDollarSign } from "react-icons/fi"
import { MdOutlineNoEncryption } from "react-icons/md"
import type { Step } from "ui"
import { Debug, Drawer, Stepper } from "ui"
import { defaultToast } from "~/utils/toast"
import { trpc } from "~/utils/trpc"

type FormProps = {
	mode: "add" | "update"
	id?: string
}

export const CryptoForm = ({ mode, id = "" }: FormProps) => {
	/** Toasts */
	const toast = useToast()
	/** Drawer controls */
	const { onClose, isOpen, onOpen } = useDisclosure()

	const cryptoDelete = trpc.cryptocurrency.delete.useMutation()

	const cryptoAdd = trpc.cryptocurrency.create.useMutation()

	const cryptoEdit = trpc.cryptocurrency.update.useMutation()

	const { data, status } = trpc.cryptocurrency.byId.useQuery({ id })

	/** Create form */
	const methods = useForm<Cryptocurrency>({
		defaultValues: data,
	})

	/** React hook form memoizes values by default, so when data changes we reset the form */
	useEffect(() => methods.reset(data), [data, methods])

	/** On Submit function for form */
	const onFormSubmit = (submitData: Cryptocurrency) => {
		if (mode === "update") {
			cryptoEdit
				.mutateAsync({
					id: submitData.id,
					userId: submitData.userId,
					data: submitData,
				})
				.then(() => {
					onClose()
					methods.reset()
					toast({
						title: `Successfully edited ${submitData.balance} ${submitData.displayName}`,
						status: "success",
						...defaultToast,
					})
				})
				.catch(logger.error)
		}
		if (mode === "add") {
			cryptoAdd
				.mutateAsync(submitData)
				.then(() => {
					onClose()
					methods.reset()
					toast({
						title: `Successfully created ${submitData.balance} ${submitData.displayName}`,
						status: "success",
						...defaultToast,
					})
				})
				.catch(logger.error)
		}
	}

	const steps: Step[] = [
		{
			label: "Describe",
			content: <StepOne />,
			icon: <FiDollarSign />,
			description: "Step 1 description",
			key: "ac2799f9-72f7-4b7c-b126-ea58f53f527f",
		},
		{
			label: "Market",
			content: <StepTwo />,
			icon: <MdOutlineNoEncryption />,
			description: "Step 2 description",
			key: "4a646453-17d0-4153-9f99-46360b328dbe",
		},
		{
			label: "Income",
			content: <StepThree />,
			icon: <BsPerson />,
			description: "Step 3 description",
			key: "4c1bfdbf-4b8d-4b50-90dc-7195b750415c",
		},
	]

	return (
		<FormProvider {...methods}>
			<IconButton
				size="sm"
				onClick={onOpen}
				icon={mode === "update" ? <EditIcon /> : <AddIcon />}
				isLoading={status === "loading" && mode === "update"}
				aria-label={""}
			/>
			<Drawer onClose={onClose} isOpen={isOpen}>
				<DrawerHeader borderBottomWidth="1px">
					CalculatedCryptocurrency
				</DrawerHeader>
				<DrawerBody>
					<form
						id="crypto-form"
						onSubmit={methods.handleSubmit(onFormSubmit, logger.error)}
					>
						<Stepper steps={steps} />
					</form>
					<Debug data={methods.formState} />
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
						{data && (
							<Button
								flex={1}
								colorScheme="red"
								isLoading={methods.formState.isSubmitting}
								onClick={() =>
									window.confirm(
										`Are you sure you want to delete ${data.displayName}?`
									) &&
									cryptoDelete.mutateAsync({ id: data.id }).then(() =>
										toast({
											title: `Deleted ${data.displayName}!`,
											status: "success",
											...defaultToast,
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
		</FormProvider>
	)
}
