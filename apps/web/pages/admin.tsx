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
import { Card, Grid, MarkdownEditor, Page } from "ui"
import { Csv } from "~/components/Csv"
import { trpc } from "~/utils/trpc"

const Index = () => {
	const { data: users } = trpc.user.all.useQuery()

	const { data: logs } = trpc.logs.read.useQuery()
	const { data: findInactiveUsers } = trpc.user.findInactiveUsers.useQuery()

	const { data: findUsersWithSession } =
		trpc.user.findUsersWithSession.useQuery()

	const { data: findUsersWithCryptocurrency } =
		trpc.user.findUsersWithCryptocurrency.useQuery()

	const { data: findUsersWithBudget } = trpc.user.findUsersWithBudget.useQuery()

	const { data: findAdminUsers } = trpc.user.findAdminUsers.useQuery()

	const { data: findVerifiedUsers } = trpc.user.findVerifiedUsers.useQuery()

	const { data: findUsersWithProviderAccount } =
		trpc.user.findUsersWithProviderAccount.useQuery({
			provider: "google",
		})

	return (
		<Page title="Home">
			<Stack alignItems="center" padding="16px">
				<Heading>Admin dashboard</Heading>
				<Csv />
				Hello
				<MarkdownEditor markdown={""} />
				<Text textAlign="left" width="100%" fontSize="2xl">
					Stats
				</Text>
				<Grid columns={4} padding="16px">
					<Card>
						<Stat>
							<StatLabel>Verified users</StatLabel>
							<StatNumber>{findVerifiedUsers?.length}</StatNumber>
							<StatHelpText>Users who have verified their email:</StatHelpText>
							<List>
								{findVerifiedUsers?.map((verifiedUser) => (
									<ListItem key={verifiedUser.id}>{verifiedUser.name}</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Admin users</StatLabel>
							<StatNumber>{findAdminUsers?.length}</StatNumber>
							<StatHelpText>Users who have admin their email:</StatHelpText>
							<List>
								{findAdminUsers?.map((adminUser) => (
									<ListItem key={adminUser.id}>{adminUser.name}</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Google users</StatLabel>
							<StatNumber>{findUsersWithProviderAccount?.length}</StatNumber>
							<StatHelpText>Users who have google emails:</StatHelpText>
							<List>
								{findUsersWithProviderAccount?.map((googleUser) => (
									<ListItem key={googleUser.id}>{googleUser.name}</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Budget users</StatLabel>
							<StatNumber>{findUsersWithBudget?.length}</StatNumber>
							<StatHelpText>Users who have at least one budget:</StatHelpText>
							<List>
								{findUsersWithBudget?.map((budgetUser) => (
									<ListItem key={budgetUser.id}>{budgetUser.name}</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Cryptocurrency users</StatLabel>
							<StatNumber>{findUsersWithCryptocurrency?.length}</StatNumber>
							<StatHelpText>
								Users who have at least one cryptocurrency:
							</StatHelpText>
							<List>
								{findUsersWithCryptocurrency?.map((cryptocurrencyUser) => (
									<ListItem key={cryptocurrencyUser.id}>
										{cryptocurrencyUser.name}
									</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Signed in at least once</StatLabel>
							<StatNumber>{findUsersWithSession?.length}</StatNumber>
							<StatHelpText>
								Users who have logged in at least once:
							</StatHelpText>
							<List>
								{findUsersWithSession?.map((hadSession) => (
									<ListItem key={hadSession.id}>{hadSession.name}</ListItem>
								))}
							</List>
						</Stat>
					</Card>
					<Card>
						<Stat>
							<StatLabel>Inactive users</StatLabel>
							<StatNumber>{findInactiveUsers?.length}</StatNumber>
							<StatHelpText>
								Users who have not logged in for the past 30 days:
							</StatHelpText>
							<List>
								{findInactiveUsers?.map((inactiveUser) => (
									<ListItem key={inactiveUser.id}>{inactiveUser.name}</ListItem>
								))}
							</List>
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
					Logs
				</Text>
				{logs?.map((log) => (
					<Card key={log.id}>
						<List>
							<ListItem>{log.createdAt.toLocaleDateString()}</ListItem>
							<ListItem>
								Flagged for deletion: {log.deleted.toString()}
							</ListItem>
							<ListItem>{log.id}</ListItem>
							<ListItem>{log.message}</ListItem>
							<ListItem>{log.type}</ListItem>
							<ListItem>{log.updatedAt.toLocaleDateString()}</ListItem>
						</List>
					</Card>
				))}
			</Stack>
		</Page>
	)
}

Index.auth = false
export default Index
