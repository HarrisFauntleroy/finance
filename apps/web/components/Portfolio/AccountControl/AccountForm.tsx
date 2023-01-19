import React, { Fragment, useEffect } from "react"

import { EditIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
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
import { Card } from "ui"
import { logger } from "~/../../packages/common/dist"
import type { RouterInput } from "~/utils/trpc"
import { trpc } from "~/utils/trpc"

type AssetUpdateInput = RouterInput["assets"]["update"]

interface UpdateAsset extends AssetUpdateInput {
	id: string
}

interface CreateAsset extends AssetUpdateInput {
	id: never
}

export type AssetFormInputs = CreateAsset | UpdateAsset

type FormProps = {
	defaultValues?: AssetFormInputs
}

export const AssetForm = ({ defaultValues }: FormProps) => {
	const toast = useToast()
	const session = useSession()
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const userId = session?.data?.userId

	const createAsset = trpc.assets.create.useMutation()
	const updateAsset = trpc.assets.update.useMutation()

	const methods = useForm<AssetFormInputs>({
		defaultValues: { userId, ...defaultValues },
	})

	const { handleSubmit, register, reset } = methods

	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onValidSubmit: SubmitHandler<AssetFormInputs> = (data) => {
		if (userId) {
			if (defaultValues?.id) {
				return updateAsset.mutateAsync(data).then((asset) => {
					queryClient.invalidateQueries()
					onClose()
					toast({
						title: `Successfully updated account ${asset.name}`,
						status: "success",
					})
				})
			}
			return createAsset.mutateAsync(data).then(({ name }) => {
				queryClient.invalidateQueries()
				onClose()
				toast({
					title: `Successfully created account ${name}`,
					status: "success",
				})
			})
		}
		return new Error("No userId provided")
	}

	interface FormInputBase {
		id: string
		name: keyof AssetUpdateInput
		label: string
		hidden?: boolean
		required?: boolean
	}

	interface FormInput extends FormInputBase {
		type: "text"
		options?: never
	}

	interface SelectFormInput extends FormInputBase {
		type: "select"
		options?: string[]
	}

	interface MultiSelectFormInput extends FormInputBase {
		type: "multi-select"
		options?: Record<string, unknown>[]
	}

	type FormInputs = FormInput | SelectFormInput | MultiSelectFormInput

	const inputs: FormInputs[] = [
		{
			id: "3456456346",
			label: "ID",
			name: "id",
			type: "text",
			hidden: true,
			required: true,
		},
		{
			id: "63454663456",
			label: "User ID",
			name: "userId",
			type: "text",
			hidden: true,
			required: true,
		},
		{
			id: "34655364654",
			label: "Name",
			name: "name",
			type: "text",
		},
		{
			id: "245624652",
			label: "Currency",
			name: "currency",
			type: "select",
			options: ["USD", "AUD"],
		},
		{
			id: "24654562456",
			label: "API Key",
			name: "apiKey",
			type: "text",
			required: false,
		},
		{
			id: "52464562",
			label: "API Secret",
			name: "apiSecret",
			type: "text",
			required: false,
		},
		{
			id: "24654262456",
			label: "Wallet Address",
			name: "walletAddress",
			type: "text",
		},
		{
			id: "24565426",
			label: "Value",
			name: "value",
			type: "text",
		},
		{
			id: "24564562",
			label: "Value Last Updated",
			name: "valueLastUpdated",
			type: "text",
			hidden: true,
			required: false,
		},
		{
			id: "2456456542",
			label: "Balance",
			name: "balance",
			type: "text",
		},
		{
			id: "2464565422",
			label: "Cost Basis",
			name: "costBasis",
			type: "text",
		},
		{
			id: "24564256",
			label: "Realised Gain",
			name: "realisedGain",
			type: "text",
		},
		{
			id: "24565426",
			label: "Target Balance",
			name: "targetBalance",
			type: "text",
			required: false,
		},
		{
			id: "624562546452",
			label: "Interest Bearing Balance",
			name: "interestBearingBalance",
			type: "text",
			required: false,
		},
		{
			id: "45675674575",
			label: "Income Rate",
			name: "incomeRate",
			type: "text",
			required: false,
		},
		{
			id: "3423432423",
			label: "Connection",
			name: "connection",
			type: "text",
		},
		{
			id: "465464565",
			label: "Labels",
			name: "labels",
			type: "multi-select",
		},
		{
			id: "567657884",
			label: "Category ID",
			name: "categoryId",
			type: "text",
			required: false,
		},
		{
			id: "3653634554456",
			label: "Custom Category",
			name: "customCategory",
			type: "text",
			required: false,
		},
		{
			id: "43252346565",
			label: "Market ID",
			name: "marketId",
			type: "text",
			required: false,
		},
		{
			id: "346456345654",
			label: "Parent ID",
			name: "parentId",
			type: "text",
			required: false,
		},
	]

	return (
		<Fragment>
			<Button
				colorScheme={defaultValues?.id ? "blue" : "green"}
				onClick={onOpen}
				variant="outline"
			>
				{defaultValues?.id ? <EditIcon /> : "NEW ACCOUNT"}
			</Button>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<FormProvider {...methods}>
						<form>
							<ModalHeader>
								{defaultValues?.id ? "UPDATE ACCOUNT" : "CREATE ACCOUNT"}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Card>
									{inputs?.map((input) => (
										<FormControl key={input.id}>
											<FormLabel>{input.label}</FormLabel>
											<Input type="text" {...register(input.name)} />
										</FormControl>
									))}
									<FormControl>
										<FormLabel>Currency</FormLabel>
										<Input type="text" {...register("currency")} />
									</FormControl>
								</Card>
								{(createAsset.isLoading || updateAsset.isLoading) && (
									<Progress size="xs" isIndeterminate />
								)}
							</ModalBody>
							<ModalFooter>
								<ButtonGroup>
									<Button
										disabled={createAsset.isLoading || updateAsset.isLoading}
										variant="outline"
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createAsset.isLoading || updateAsset.isLoading
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
							{(createAsset.error || updateAsset.error) && (
								<p>
									Something went wrong!{" "}
									{createAsset?.error?.message || updateAsset?.error?.message}
								</p>
							)}
						</form>
					</FormProvider>
				</ModalContent>
			</Modal>
		</Fragment>
	)
}
