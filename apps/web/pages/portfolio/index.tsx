import {
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react"
import React from "react"
import Overview from "./overview"
import Transactions from "./transactions"
import Statistics from "./statistics"
import Accounts from "./accounts"
import Link from "next/link"

const Portfolio = () => {
	return (
		<Stack padding="8px">
			<Tabs variant="enclosed">
				<TabList>
					<Tab>Overview</Tab>
					<Tab>Accounts</Tab>
					<Tab>Transactions</Tab>
					<Tab>Statistics</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Overview />
					</TabPanel>
					<TabPanel>
						<Accounts />
					</TabPanel>
					<TabPanel>
						<Transactions />
					</TabPanel>
					<TabPanel>
						<Statistics />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Text textAlign="center">
				Price data provided by{" "}
				<Link href="https://www.coingecko.com">CoinGecko</Link>
			</Text>
		</Stack>
	)
}

Portfolio.auth = true
export default Portfolio
