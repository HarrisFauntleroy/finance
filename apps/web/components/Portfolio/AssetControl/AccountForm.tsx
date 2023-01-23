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

	const { handleSubmit, reset } = methods

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

	const inputs: FormInputs[] = [
		{
			id: "5c643ac8-5ae3-4a4c-8f00-233279ebfd60",
			label: "ID",
			name: "id",
			type: "text",
			hidden: true,
			required: true,
		},
		{
			id: "88ab98d3-5f54-42b6-b6a1-5e2cc27e6845",
			label: "User ID",
			name: "userId",
			type: "text",
			hidden: true,
			required: true,
		},
		{
			id: "1f168748-7f15-48c5-907d-e0605e452587",
			label: "Name",
			name: "name",
			type: "text",
		},
		{
			id: "f1078cfb-ecaa-4d07-9b16-4c1e13fac11a",
			label: "Currency",
			name: "currency",
			type: "select",
			options: ["USD", "AUD"],
		},
		{
			id: "9d3c188d-7a76-418c-92bd-b3428536f6e2",
			label: "API Key",
			name: "apiKey",
			type: "text",
			required: false,
		},
		{
			id: "ba38ec5e-23c4-4516-a431-8b9e586c2662",
			label: "API Secret",
			name: "apiSecret",
			type: "text",
			required: false,
		},
		{
			id: "a75dde14-6d5d-459a-8adf-6f387e7a7848",
			label: "Wallet Address",
			name: "walletAddress",
			type: "text",
		},
		{
			id: "dfe0b012-8a85-4990-9588-d6f1d21644bf",
			label: "Value",
			name: "value",
			type: "text",
		},
		{
			id: "83cd2e3f-d915-4ecf-80ab-8d34c1e1deb2",
			label: "Value Last Updated",
			name: "valueLastUpdated",
			type: "text",
			hidden: true,
			required: false,
		},
		{
			id: "26eb07cd-7af3-41ab-9b79-104f87fc3bc0",
			label: "Balance",
			name: "balance",
			type: "text",
		},
		{
			id: "03e7806e-d47e-43e1-8175-80aaf306d765",
			label: "Cost Basis",
			name: "costBasis",
			type: "text",
		},
		{
			id: "724cc579-a040-4e62-a0e9-39dc1aff884d",
			label: "Realised Gain",
			name: "realisedGain",
			type: "text",
		},
		{
			id: "b9d1c05c-aeb8-4223-8586-89ed8590ca95",
			label: "Target Balance",
			name: "targetBalance",
			type: "text",
			required: false,
		},
		{
			id: "92f18bf5-6825-4a90-95e6-5c373854b56d",
			label: "Interest Bearing Balance",
			name: "interestBearingBalance",
			type: "text",
			required: false,
		},
		{
			id: "3d9b9c3d-1168-4af6-837a-c5fb30c9741c",
			label: "Income Rate",
			name: "incomeRate",
			type: "text",
			required: false,
		},
		{
			id: "858b639e-59aa-466f-af02-935100caf47e",
			label: "Connection",
			name: "connection",
			type: "text",
		},
		{
			id: "afc1a8c0-3685-45a6-90f2-55407adf3b5f",
			label: "Labels",
			name: "labels",
			type: "multi-select",
		},
		{
			id: "22f76f55-1af0-4a78-ab93-6165a305e984",
			label: "Category ID",
			name: "categoryId",
			type: "text",
			required: false,
		},
		{
			id: "3e2f683e-c1ad-42bd-8928-045001dc44fe",
			label: "Custom Category",
			name: "customCategory",
			type: "text",
			required: false,
		},
		{
			id: "92d5f3a9-c083-4a2e-a3f2-b2cd730c2e37",
			label: "Market ID",
			name: "marketId",
			type: "text",
			required: false,
		},
		{
			id: "3933466e-a807-425d-9b9f-6ea339c4b2f3",
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
								{inputs?.map((input) => (
									<TextInput
										key={input.name}
										name={input.name}
										label={input.label}
										type={input.type}
									/>
								))}
								{(createAsset.isLoading || updateAsset.isLoading) && (
									<Progress size="xs" isIndeterminate />
								)}
							</ModalBody>
							<ModalFooter>
								<ButtonGroup>
									<Button
										disabled={createAsset.isLoading || updateAsset.isLoading}
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createAsset.isLoading || updateAsset.isLoading
											? "LOADING..."
											: "SUBMIT"}
									</Button>
									<Button onClick={onClose} colorScheme="orange">
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
