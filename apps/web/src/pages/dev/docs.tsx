/**
 * This page containers the UI for the API docs
 */
import dynamic from "next/dynamic"
import "swagger-ui-react/swagger-ui.css"
import Page from "~/components/Page"
import type { DefaultPage } from "~/pages/_app"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
	ssr: false,
})

const Docs: DefaultPage = () => {
	return (
		<Page>
			<SwaggerUI url="/swagger.json" />
		</Page>
	)
}

Docs.auth = false
export default Docs
