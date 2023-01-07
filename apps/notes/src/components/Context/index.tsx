import type { PropsWithChildren } from "react"
import React from "react"

import { IntlProvider } from "~/components/Context/I18n"
import Theme from "~/components/Context/Theme"

export function AppContext({ children }: PropsWithChildren) {
	return (
		<Theme>
			<IntlProvider>{children}</IntlProvider>
		</Theme>
	)
}
