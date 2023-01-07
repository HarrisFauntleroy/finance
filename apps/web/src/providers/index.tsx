import type { PropsWithChildren } from "react"
import React from "react"

import { IntlProvider } from "~/providers/I18n"
import { PrivacyProvider } from "~/providers/Privacy"
import Theme from "~/providers/Theme"

export function AppContext({ children }: PropsWithChildren) {
	return (
		<Theme>
			<PrivacyProvider>
				<IntlProvider>{children}</IntlProvider>
			</PrivacyProvider>
		</Theme>
	)
}
