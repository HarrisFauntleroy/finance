import React from "react"

import { trpc } from "../utils/trpc"
import type { Role } from "database/generated/prisma-client"
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"
import { type NextPage } from "next"
import { type AppProps } from "next/app"
import { type Session } from "next-auth"
import { AppContext } from "~/components/Providers"
import Layout from "~/components/Layout"
import Auth from "./auth"
import { SessionProvider } from "next-auth/react"

export type WithAuth = {
	auth: boolean
}

export type WithRole = {
	roles?: Role[]
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode
} & WithAuth &
	WithRole

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
	Component: NextPageWithLayout
	session?: Session
}

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
	const getLayout =
		Component.getLayout ??
		((page) =>
			Component.auth ? (
				<Layout>
					<Auth roles={Component.roles}>{page}</Auth>
				</Layout>
			) : (
				<Layout>{page}</Layout>
			))

	return (
		<SessionProvider session={session}>
			<AppContext>
				<DefaultSeo {...SEO} />
				{getLayout(<Component {...pageProps} />)}
			</AppContext>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
