import type { FC, ReactElement, ReactNode } from "react"

import SEO from "../../next-seo.config"
import { trpc } from "../utils/trpc"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/dist/shared/lib/router/router"
import { AppContext } from "~/components/Context"
import Layout from "~/components/Layout"
import Auth from "./auth"

interface WithLayout {
	getLayout?: (page: ReactElement | JSX.Element) => ReactNode
}

export type WithAuth = {
	auth: boolean
}

export type DefaultPage = FC & WithAuth & WithLayout

interface AppPropsWithLayout extends AppProps {
	Component: DefaultPage
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
					<Auth>{page}</Auth>
				</Layout>
			) : (
				<Layout>{page}</Layout>
			))

	return (
		<SessionProvider session={session}>
			<DefaultSeo {...SEO} />
			<AppContext>{getLayout(<Component {...pageProps} />)}</AppContext>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
