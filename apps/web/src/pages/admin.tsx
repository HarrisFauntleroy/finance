/**
 *
 * Index page
 *
 */
import React from "react"

import {
	Avatar,
	Flex,
	Heading,
	List,
	ListItem,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react"
import Card from "~/components/Cards"
import { Grid } from "~/components/Grid"
import Page from "~/components/Page"
import type { DefaultPage } from "~/pages/_app"
import { trpc } from "~/utils/trpc"

const Index: DefaultPage = () => {
	const { data: users } = trpc.user.all.useQuery()

	const { data: deleteQueue } = trpc.settings.deleteQueue.useQuery()

	return (
		<Page title="Home">
			<Stack alignItems="center" padding="16px">
				<Heading>Admin dashboard</Heading>
				<Text textAlign="left" width="100%" fontSize="2xl">
					Stats
				</Text>
				<Grid columns={4} padding="16px">
					<Card>
						<Stat>
							{/* This is the total number of users who have signed up for an account on your website. */}
							<StatLabel>Registered users</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the number of users who have logged in and engaged with your website within a specific time period, such as the past month. */}
							<StatLabel>Active users</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the number of users who have signed up for an account on your website within a specific time period. */}
							<StatLabel>New users</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the percentage of users who continue to use your website over time. */}
							<StatLabel>User retention rate</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is a measure of how actively users are interacting with your website, such as by viewing pages, clicking on links, or making purchases. */}
							<StatLabel>User engagement</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is a breakdown of where your website traffic is coming from, such as search engines, social media, or referral websites. */}
							<StatLabel>Traffic sources</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the total number of pages that have been viewed on your website within a specific time period. */}
							<StatLabel>Page views this month</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/*  This is the percentage of visitors who leave your website after viewing only one page. A high bounce rate may indicate that visitors are not finding what they are looking for on your website. */}
							<StatLabel>Bounce rate</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the percentage of visitors who take a desired action, such as making a purchase or signing up for an account. */}
							<StatLabel>Conversion rate</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
					<Card>
						<Stat>
							{/* This is the total amount of money that your website has generated within a specific time period, either through sales or through advertising or other means. */}
							<StatLabel>Revenue</StatLabel>
							<StatNumber>{users?.length}</StatNumber>
							<StatHelpText>Feb 12 - Feb 28</StatHelpText>
						</Stat>
					</Card>
				</Grid>
				<Text textAlign="left" width="100%" fontSize="2xl">
					Users
				</Text>
				<Grid columns={4} padding="16px">
					{users?.map((user) => (
						<Card
							key={user.id}
							style={{
								padding: "16px",
							}}
						>
							<Flex
								style={{
									alignItems: "center",
									justifyContent: "left",
									gap: "16px",
								}}
							>
								<Avatar src={user.image || ""} />
								<List>
									<ListItem>Name: {user.name}</ListItem>
									<ListItem>Role: {user.role.toLowerCase()}</ListItem>
									<ListItem fontSize={16}>ID: {user.id}</ListItem>
								</List>
							</Flex>
						</Card>
					))}
				</Grid>
				<Text textAlign="left" width="100%" fontSize="2xl">
					Delete Queue
				</Text>
				{deleteQueue?.map((setting) => (
					<Card key={setting.id}>
						<List>
							<ListItem>{setting.id}</ListItem>
							<ListItem>{setting.userId}</ListItem>
							<ListItem>{setting.userCurrency}</ListItem>
							<ListItem>{setting.userLanguage}</ListItem>
						</List>
					</Card>
				))}
			</Stack>
		</Page>
	)
}

Index.auth = false
export default Index
