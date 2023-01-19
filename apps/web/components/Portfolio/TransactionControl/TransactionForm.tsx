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

	const { handleSubmit, register, reset } = methods

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

	return (
		<Fragment>
			<Button
				colorScheme={defaultValues?.id ? "blue" : "green"}
				onClick={onOpen}
				variant="outline"
			>
				{defaultValues?.id ? <EditIcon /> : "NEW BUDGET"}
			</Button>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<FormProvider {...methods}>
						<form>
							<ModalHeader>
								{defaultValues?.id ? "UPDATE BUDGET" : "CREATE BUDGET"}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Card>
									<FormControl>
										<FormLabel>Name</FormLabel>
										<Input type="text" {...register("name")} />
									</FormControl>
									<FormControl>
										<FormLabel>Balance</FormLabel>
										<Input type="text" {...register("totalBalance")} />
									</FormControl>
								</Card>
								{(createBudget.isLoading || updateBudget.isLoading) && (
									<Progress size="xs" isIndeterminate />
								)}
							</ModalBody>
							<ModalFooter>
								<ButtonGroup>
									<Button
										disabled={createBudget.isLoading || updateBudget.isLoading}
										variant="outline"
										colorScheme="green"
										type="submit"
										onClick={handleSubmit(onValidSubmit, logger.error)}
									>
										{createBudget.isLoading || updateBudget.isLoading
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
