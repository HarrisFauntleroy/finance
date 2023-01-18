import React from "react"
import type { Budget } from "database/generated/prisma-client"
import type { SubmitHandler } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import { useForm } from "react-hook-form"
import { Card } from "ui"
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	useToast,
} from "@chakra-ui/react"
import { trpc } from "~/utils/trpc"
import { useSession } from "next-auth/react"

type Inputs = Budget

export const BudgetForm = () => {
	const toast = useToast()

	const session = useSession()
	const userId = session?.data?.userId

	const budgetMutation = trpc.budget.create.useMutation()

	const methods = useForm<Inputs>()
	const { handleSubmit, register, formState } = methods
	const onSubmit: SubmitHandler<Inputs> = (data) =>
		userId
			? budgetMutation
					.mutateAsync({ name: data.name, userId })
					.then(({ name }) =>
						toast({
							title: `Successfully created budget ${name}`,
							status: "success",
						})
					)
			: new Error("No userId provided")

	return (
		<Card>
			<FormProvider {...methods}>
				<code>{JSON.stringify(formState)}</code>
				<form>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input type="text" {...register("name")} />
						<FormHelperText>Name the budget</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>Total Balance</FormLabel>
						<Input type="text" {...register("totalBalance")} />
						<FormHelperText>Balance of the budget</FormHelperText>
					</FormControl>
					<Button
						disabled={budgetMutation.isLoading}
						variant="outline"
						type="submit"
						onClick={handleSubmit(onSubmit)}
					>
						{budgetMutation.isLoading ? "Loading" : "Submit"}
					</Button>
				</form>
				{budgetMutation.error && (
					<p>Something went wrong! {budgetMutation.error.message}</p>
				)}
			</FormProvider>
		</Card>
	)
}
