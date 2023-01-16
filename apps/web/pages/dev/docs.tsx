/**
 * This page containers the UI for the API docs
 */
import dynamic from "next/dynamic"
import "swagger-ui-react/swagger-ui.css"
import { Page } from "ui"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
	ssr: false,
})

const Docs = () => {
	return (
		<Page>
			<SwaggerUI url="/swagger.json" />
		</Page>
	)
}

Docs.auth = false
export default Docs