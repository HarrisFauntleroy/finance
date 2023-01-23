import React from "react"

import { DeleteIcon } from "@chakra-ui/icons"
import { Button, useToast } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { trpc } from "~/utils/trpc"

interface DeleteBudgetProps {
	id?: string
}

export const DeleteBudget = ({ id }: DeleteBudgetProps) => {
	const toast = useToast()
	const queryClient = useQueryClient()

	const deleteBudget = trpc.budget.delete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	return (
		<Button
			colorScheme="red"
			onClick={() => {
				if (id) {
					return deleteBudget.mutateAsync({ id })
				}
				return toast({
					title: `No budget found, missing ID`,
					status: "error",
				})
			}}
		>
			<DeleteIcon />
		</Button>
	)
}
