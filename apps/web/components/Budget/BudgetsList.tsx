import React from "react"

import {
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Stack,
	Stat,
	StatGroup,
	StatHelpText,
	StatNumber,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { Card, Grid } from "ui"
import { BudgetForm } from "~/components/Budget/BudgetForm"
import { trpc } from "~/utils/trpc"
import currency from "currency.js"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useQueryClient } from "@tanstack/react-query"

export const BudgetsList = () => {
	const session = useSession()

	const userId = session?.data?.userId

	const queryClient = useQueryClient()

	const { data } = trpc.budget.byUserId.useQuery({
		userId: userId || "",
	})

	const deleteBudget = trpc.budget.delete.useMutation({
		onSuccess: () => {
			queryClient.invalidateQueries()
		},
	})

	return (
		<Stack gap="8px">
			<Flex justify="space-between" align="center">
				<Button variant="outline">NEW BUDGET</Button>
			</Flex>
			<BudgetForm />
			<Grid>
				{data?.map((budget) => (
					<Card key={budget.id}>
						<Stack justify="space-between" align="top">
							<Stack>
								<Heading size="md">{budget.name}</Heading>
							</Stack>

							<StatGroup gap="16px">
								<Stat>
									<StatNumber>
										{currency(String(budget.income)).format()}
									</StatNumber>
									<StatHelpText>Income</StatHelpText>
								</Stat>
								<Stat>
									<StatNumber>{currency(1000).format()}</StatNumber>
									<StatHelpText>Current balance</StatHelpText>
								</Stat>
								<Stat>
									<StatNumber>{currency(40).format()}</StatNumber>
									<StatHelpText>Daily spend limit</StatHelpText>
								</Stat>
							</StatGroup>
							<ButtonGroup alignItems="center">
								<Button
									variant="outline"
									colorScheme="red"
									onClick={() => {
										deleteBudget.mutateAsync({ id: budget.id })
									}}
								>
									<DeleteIcon />
								</Button>
								<Button variant="outline" colorScheme="blue">
									<EditIcon />
								</Button>
							</ButtonGroup>
						</Stack>
					</Card>
				))}
			</Grid>
		</Stack>
	)
}
