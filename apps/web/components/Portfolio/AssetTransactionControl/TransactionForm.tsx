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
import { useSession } from "next-auth/react"
import type { SubmitHandler } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import { useForm } from "react-hook-form"
import { logger } from "~/../../packages/common/dist"
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
		if (userId) {
			if (defaultValues?.id) {
				return updateAssetTransaction.mutateAsync(data).then(({ name }) => {
					queryClient.invalidateQueries()
					onClose()
					toast({
						title: `Successfully updated transaction ${name}`,
						status: "success",
					})
				})
			}
			return createAssetTransaction.mutateAsync(data).then(({ name }) => {
				queryClient.invalidateQueries()
				onClose()
				toast({
					title: `Successfully created transaction ${name}`,
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
			required: true,
		},
	]

	return (
		<Fragment>
			<Button
				maxW="max-content"
				colorScheme={defaultValues?.id ? "blue" : "green"}
				onClick={onOpen}
				variant="outline"
			>
				{defaultValues?.id ? <EditIcon /> : "NEW ASSET TRANSACTION"}
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
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
									<TextInput
										key={input.name}
										name={input.name}
										label={input.label}
										type={input.type}
									/>
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
										variant="outline"
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createAssetTransaction.isLoading ||
										updateAssetTransaction.isLoading
											? "LOADING..."
											: "SUBMIT"}
									</Button>
									<Button
										onClick={onClose}
										variant="outline"
										colorScheme="orange"
									>
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
