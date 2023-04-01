import React from "react"

import { Layout } from "../Layout"
import { Button, GridItem } from "@chakra-ui/react"
import { Card } from "ui"

export const BudgetOverview = () => {
	return (
		<Layout>
			<Card height="64px" area={"date-picker"}>
				Date picker
			</Card>
			<Card area={"spending-breakdown"}>
				SPENDING BREAKDOWN
				<ul style={{ listStyle: "none" }}>
					<li>Income</li>
					<li>Expenses</li>
				</ul>
			</Card>
			<Card area={"accounts-overview"}>ACCOUNTS OVERVIEW </Card>
			<Card area={"period-summary"}>PERIOD SUMMARY</Card>
			<GridItem area={"stats"}>
				<Card height="128px">
					<Button>Review Transactions</Button>
				</Card>
				<Card height="128px">
					<Button>Set November Budget</Button>
				</Card>
				<Card height="128px">
					<Button>Review Recurring Items</Button>
				</Card>
				<Card height="128px">
					<Button>Setup Accounts</Button>
					<p>Goes to accounts page</p>
				</Card>
			</GridItem>
		</Layout>
	)
}
