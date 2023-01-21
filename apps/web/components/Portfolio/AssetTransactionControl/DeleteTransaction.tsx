import React from "react"

import { DeleteIcon } from "@chakra-ui/icons"
import { Button, useToast } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { trpc } from "~/utils/trpc"

interface DeleteTransactionProps {
	id?: string
}

export const DeleteTransaction = ({ id }: DeleteTransactionProps) => {
	const toast = useToast()
	const queryClient = useQueryClient()

	const deleteTransaction = trpc.assetTransactions.delete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	return (
		<Button
			variant="outline"
			colorScheme="red"
			onClick={() => {
				if (id) {
					return deleteTransaction.mutateAsync({ id })
				}
				return toast({
					title: `No transaction found, missing ID`,
					status: "error",
				})
			}}
		>
			<DeleteIcon />
		</Button>
	)
}
