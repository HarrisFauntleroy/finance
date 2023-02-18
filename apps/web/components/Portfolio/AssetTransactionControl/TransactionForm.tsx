import React, { Fragment, useEffect } from "react"

import { EditIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { logger } from "common"
import { useSession } from "next-auth/react"
import type { SubmitHandler } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import { useForm } from "react-hook-form"
import type { FormInputs } from "~/components/Form/TextInput"
import { TextInput } from "~/components/Form/TextInput"
import type { RouterInput } from "~/utils/trpc"
import { trpc } from "~/utils/trpc"

type AssetTransactionUpdateInput = RouterInput["assetTransactions"]["update"]

interface UpdateAssetTransaction extends AssetTransactionUpdateInput {
	id: string
}

interface CreateAssetTransaction extends AssetTransactionUpdateInput {
	id: never
}

export type AssetTransactionFormInputs =
	| CreateAssetTransaction
	| UpdateAssetTransaction

type FormProps = {
	defaultValues?: AssetTransactionFormInputs
}

export const AssetTransactionForm = ({ defaultValues }: FormProps) => {
	const toast = useToast()
	const session = useSession()
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const userId = session?.data?.userId

	const createAssetTransaction = trpc.assetTransactions.create.useMutation()
	const updateAssetTransaction = trpc.assetTransactions.update.useMutation()

	const methods = useForm<AssetTransactionFormInputs>({
		defaultValues: { userId, ...defaultValues },
	})

	const { handleSubmit, reset } = methods

	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onValidSubmit: SubmitHandler<AssetTransactionFormInputs> = (data) => {
		const formattedData = {
			...data,
			timestamp: data.timestamp && new Date(data.timestamp),
			expiry: data.expiry && new Date(data.expiry),
		}
		if (userId) {
			if (defaultValues?.id) {
				return updateAssetTransaction
					.mutateAsync(formattedData)
					.then(({ id }) => {
						queryClient.invalidateQueries()
						onClose()
						toast({
							title: `Successfully updated transaction ${id}`,
							status: "success",
						})
					})
			}
			return createAssetTransaction
				.mutateAsync(formattedData)
				.then(({ id }) => {
					queryClient.invalidateQueries()
					onClose()
					toast({
						title: `Successfully created transaction ${id}`,
						status: "success",
					})
				})
		}
		return new Error("No userId provided")
	}

	const inputs: FormInputs[] = [
		{
			id: "5c643ac8-5ae3-4a4c-8f00-233279ebfd60",
			label: "ID",
			name: "id",
			type: "text",
			hidden: true,
		},
		{
			id: "",
			label: "User ID",
			name: "userId",
			type: "text",
			hidden: true,
			required: true,
		},
		{
			id: "",
			label: "Timestamp",
			name: "timestamp",
			type: "date",
			required: false,
		},
		{
			id: "",
			label: "Price Per Unit",
			name: "pricePerUnit",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Base Currency",
			name: "baseCurrency",
			type: "text",
			required: true,
		},
		{
			id: "",
			label: "Quantity",
			name: "quantity",
			type: "text",
			required: true,
		},
		{
			id: "",
			label: "Quantity Filled",
			name: "quantityFilled",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Fee",
			name: "fee",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Value In Base Currency",
			name: "valueInBasecurrency",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "From Asset",
			name: "fromAsset",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "To Asset",
			name: "toAsset",
			type: "text",
			required: true,
		},
		{
			id: "",
			label: "Market",
			name: "market",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Transaction Type",
			name: "transactionType",
			type: "text",
			required: true,
		},
		{
			id: "",
			label: "Expiry",
			name: "expiry",
			type: "date",
			required: false,
		},
		{
			id: "",
			label: "Status",
			name: "status",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Transaction Hash",
			name: "transactionHash",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Description",
			name: "description",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Memo",
			name: "memo",
			type: "text",
			required: false,
		},
		{
			id: "",
			label: "Related Asset ID",
			name: "relatedAssetId",
			type: "text",
			required: false,
		},
	]

	return (
		<Fragment>
			<Button
				maxW="max-content"
				colorScheme={defaultValues?.id ? "blue" : "green"}
				onClick={onOpen}
			>
				{defaultValues?.id ? <EditIcon /> : "NEW ASSET TRANSACTION"}
			</Button>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<FormProvider {...methods}>
						<form>
							<ModalHeader>
								{defaultValues?.id
									? "UPDATE ASSET TRANSACTION"
									: "CREATE ASSET TRANSACTION"}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								{inputs?.map((input) => (
									<TextInput key={input.name} {...input} />
								))}
								{(createAssetTransaction.isLoading ||
									updateAssetTransaction.isLoading) && (
									<Progress size="xs" isIndeterminate />
								)}
							</ModalBody>
							<ModalFooter>
								<ButtonGroup>
									<Button
										disabled={
											createAssetTransaction.isLoading ||
											updateAssetTransaction.isLoading
										}
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createAssetTransaction.isLoading ||
										updateAssetTransaction.isLoading
											? "LOADING..."
											: "SUBMIT"}
									</Button>
									<Button onClick={onClose} colorScheme="orange">
										CANCEL
									</Button>
								</ButtonGroup>
							</ModalFooter>
							{(createAssetTransaction.error ||
								updateAssetTransaction.error) && (
								<p>
									Something went wrong!{" "}
									{createAssetTransaction?.error?.message ||
										updateAssetTransaction?.error?.message}
								</p>
							)}
						</form>
					</FormProvider>
				</ModalContent>
			</Modal>
		</Fragment>
	)
}
