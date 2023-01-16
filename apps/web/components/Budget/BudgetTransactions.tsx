import React, { useContext } from "react"

import { HStack, IconButton, Skeleton, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Card, RenderSubComponent, Table } from "ui"
import { PrivacyContext } from "~/providers/Privacy"
import { BudgetForm } from "~/components/Budget/Form"
import { budgetColumns } from "~/components/Budget/columns"
import { trpc } from "~/utils/trpc"

export const BudgetTransactions = () => {
	const session = useSession()

	const userId = session?.data?.userId

	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	const { data } = trpc.budget.byUserId.useQuery({
		userId: userId || "",
	})

	return (
		<Card>
			<Skeleton rounded="xl" isLoaded={!!data}>
				<Table
					id="budgetOverview"
					data={data || []}
					columns={budgetColumns}
					getRowCanExpand
					filterEnabled
					paginationEnabled
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					renderSubComponent={(props: any) => <RenderSubComponent {...props} />}
				>
					<HStack>
						<Text
							variant="h3"
							fontSize={{ base: "lg", sm: "2xl" }}
							fontWeight="bold"
							lineHeight="1.2"
						>
							Assets
						</Text>
						<BudgetForm mode="add" />
						<IconButton
							icon={privacy ? <FiEyeOff /> : <FiEye />}
							aria-label=""
							onClick={() => togglePrivacy()}
						/>
					</HStack>
				</Table>
			</Skeleton>
		</Card>
	)
}