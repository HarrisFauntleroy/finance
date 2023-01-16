import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"
import React from "react"

import { IntlProvider } from "~/providers/I18n"
import { PrivacyProvider } from "~/providers/Privacy"
import Theme from "~/providers/Theme"

interface AppContextProps {
	session: Session | null
	children: ReactNode
}

export function AppContext({ session, children }: AppContextProps) {
	return (
		<SessionProvider session={session}>
			<Theme>
				<PrivacyProvider>
					<IntlProvider>{children}</IntlProvider>
				</PrivacyProvider>
			</Theme>
		</SessionProvider>
	)
}
