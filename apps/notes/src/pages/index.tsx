/**
 *
 * Index page
 *
 */
import React from "react"

import { Page } from "ui"
import type { DefaultPage } from "~/pages/_app"

const Index: DefaultPage = () => {
	return (
		<Page title="Home" gap="8px">
			Index{" "}
		</Page>
	)
}

Index.auth = false
export default Index
