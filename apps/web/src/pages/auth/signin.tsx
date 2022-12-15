/**
 * Custom sign in page for Next Auth
 */
import type { ReactElement, ReactNode } from "react"
import React from "react"

import { Button, Flex, Stack } from "@chakra-ui/react"
import type { NextPageContext } from "next"
import { getCsrfToken, getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import { BsGoogle } from "react-icons/bs"

type Provider = {
	id: string
	name: string
}

type Providers = Provider[]

type SignInProps = {
	providers: Providers
	csrfToken: string
}

export const getServerSideProps = async (context: NextPageContext) => ({
	props: {
		providers: await getProviders(),
		csrfToken: await getCsrfToken(context),
	},
})

const Signin = ({ providers }: SignInProps) => {
	// const features: Feature[] = [
	// 	{
	// 		heading: "Net worth calculator",
	// 		content:
	// 			"Track your net worth over time for an overall view of your progress towards your goals",
	// 		icon: <Icon as={MdTrendingUp} height={8} width={8} />,
	// 	},
	// 	{
	// 		heading: "Crypto portfolio tracker",
	// 		content:
	// 			"Track your current portfolio from the comfort of your personal finance app",
	// 		icon: <Icon as={BsCurrencyBitcoin} height={8} width={8} />,
	// 	},
	// 	{
	// 		heading: "Multi currency support",
	// 		content:
	// 			"Track every dollar, euro and yen and see it all add up in your home currency.",
	// 		icon: <Icon as={BsCurrencyExchange} height={8} width={8} />,
	// 	},
	// 	{
	// 		heading: "API Included",
	// 		content:
	// 			"A convenient API allows us to extend our services beyond this site. Monitor your portfolio, track market movements and much more.",
	// 		icon: <Icon as={BsTerminal} height={8} width={8} />,
	// 	},
	// 	{
	// 		heading: "Budgeting",
	// 		content:
	// 			"Making a personal budget is easy. Sticking to it is the hard part. We help you do both!",
	// 		icon: <Icon as={MdSavings} height={8} width={8} />,
	// 	},
	// 	{
	// 		heading: "Security",
	// 		content:
	// 			"Stay secure with two-factor authentication and data encryption at rest",
	// 		icon: <Icon as={LockIcon} height={8} width={8} />,
	// 	},
	// ]

	const icons: { [key: Provider["id"]]: ReactElement } = {
		google: <BsGoogle />,
	}

	return (
		<Stack mt={4} direction="column" spacing={4}>
			<Image
				src="/images/logodark.png"
				objectFit="contain"
				height="128"
				width="128"
				alt="logo"
			/>
			{providers &&
				Object.values(providers).map((provider) => (
					<Button
						size="lg"
						leftIcon={icons[provider.id]}
						maxWidth="max-content"
						key={provider.id}
						onClick={async () => signIn(provider.id)}
					>
						Sign in with {provider.name}
					</Button>
				))}
		</Stack>
	)
}

Signin.auth = false
Signin.getLayout = (children: ReactNode) => (
	<Flex
		style={{
			height: "100vh",
			width: "100vw",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		{children}
	</Flex>
)
export default Signin
