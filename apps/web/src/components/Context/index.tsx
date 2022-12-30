import type { PropsWithChildren } from "react"
import React from "react"

import { IntlProvider } from "~/components/Context/I18n"
import { PrivacyProvider } from "~/components/Context/Privacy"
import Theme from "~/components/Context/Theme"

export function AppContext({ children }: PropsWithChildren) {
	return (
		<Theme>
			<PrivacyProvider>
				<IntlProvider>{children}</IntlProvider>
			</PrivacyProvider>
		</Theme>
	)
}
