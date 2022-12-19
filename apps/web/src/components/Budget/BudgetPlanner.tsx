import React, { useContext } from "react"

import { HStack, IconButton, Skeleton, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { PrivacyContext } from "~/components/AppContext/Privacy"
import { BudgetForm } from "~/components/Budget/Form"
import { budgetColumns } from "~/components/Budget/columns"
import Card from "~/components/Cards"
import { Loading } from "~/components/Loading"
import { Table } from "~/components/Table"
import { RenderSubComponent } from "~/components/Table/Filter"
import { trpc } from "~/utils/trpc"

export const BudgetPlanner = () => {
	const session = useSession()

	const userId = session?.data?.userId

	const { privacy, togglePrivacy } = useContext(PrivacyContext)

	const { data, status: budgetStatus } = trpc.budget.byUserId.useQuery({
		userId: userId || "",
	})

	if (budgetStatus === "loading") {
		return <Loading />
	}

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
					renderSubComponent={(props) => <RenderSubComponent {...props} />}
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
