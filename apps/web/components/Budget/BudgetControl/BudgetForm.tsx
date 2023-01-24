import React, { Fragment, useEffect } from "react"

import { EditIcon } from "@chakra-ui/icons"
import {
	Button,
	ButtonGroup,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	Stack,
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

type BudgetUpdateInput = RouterInput["budget"]["update"]

interface UpdateBudget extends BudgetUpdateInput {
	id: string
}

interface CreateBudget extends BudgetUpdateInput {
	id: never
}

export type BudgetFormInputs = CreateBudget | UpdateBudget

type FormProps = {
	defaultValues?: BudgetFormInputs
}

export const BudgetForm = ({ defaultValues }: FormProps) => {
	const toast = useToast()
	const session = useSession()
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const userId = session?.data?.userId

	const createBudget = trpc.budget.create.useMutation()
	const updateBudget = trpc.budget.update.useMutation()

	const methods = useForm<BudgetFormInputs>({
		defaultValues: { userId, ...defaultValues },
	})

	const { handleSubmit, reset } = methods

	useEffect(() => reset(defaultValues), [defaultValues, reset])

	const onValidSubmit: SubmitHandler<BudgetFormInputs> = (data) => {
		if (userId) {
			if (defaultValues?.id) {
				return updateBudget.mutateAsync(data).then(({ name }) => {
					queryClient.invalidateQueries()
					onClose()
					toast({
						title: `Successfully updated budget ${name}`,
						status: "success",
					})
				})
			}
			return createBudget.mutateAsync(data).then(({ name }) => {
				queryClient.invalidateQueries()
				onClose()
				toast({
					title: `Successfully created budget ${name}`,
					status: "success",
				})
			})
		}
		return new Error("No userId provided")
	}

	const inputs: FormInputs[] = [
		{
			id: "145e9714-75f2-46b9-999f-e0895cc37952",
			label: "Name",
			name: "name",
			type: "text",
		},
		{
			id: "db3016e5-a3b7-432f-a399-8c238c562651",
			label: "Total Balance",
			name: "totalBalance",
			type: "text",
		},
	]

	return (
		<Fragment>
			<Button
				colorScheme={defaultValues?.id ? "blue" : "green"}
				onClick={onOpen}
			>
				{defaultValues?.id ? <EditIcon /> : "NEW BUDGET"}
			</Button>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<FormProvider {...methods}>
						<form>
							<ModalHeader>
								<Heading size="md">
									{defaultValues?.id ? "UPDATE BUDGET" : "CREATE BUDGET"}
								</Heading>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Stack>
									{inputs?.map((input) => (
										<TextInput key={input.name} {...input} />
									))}
								</Stack>
								{(createBudget.isLoading || updateBudget.isLoading) && (
									<Progress size="xs" isIndeterminate />
								)}
							</ModalBody>
							<ModalFooter>
								<ButtonGroup>
									<Button
										disabled={createBudget.isLoading || updateBudget.isLoading}
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createBudget.isLoading || updateBudget.isLoading
											? "LOADING..."
											: "SUBMIT"}
									</Button>
									<Button onClick={onClose} colorScheme="orange">
										CANCEL
									</Button>
								</ButtonGroup>
							</ModalFooter>
							{(createBudget.error || updateBudget.error) && (
								<p>
									Something went wrong!{" "}
									{createBudget?.error?.message || updateBudget?.error?.message}
								</p>
							)}
						</form>
					</FormProvider>
				</ModalContent>
			</Modal>
		</Fragment>
	)
}
