/**
 *
 * Index page
 *
 */
import React from "react"

import { Heading } from "@chakra-ui/react"
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart,
	Filler,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js"
import { Asset } from "common"
import { JSONObjectViewer, Page } from "ui"
import type { NextPageWithLayout } from "~/pages/_app"
import { trpc } from "~/utils/trpc"

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
)

const Index: NextPageWithLayout = () => {
	const { data } = trpc.assets.byId.useQuery({
		id: "cldwad5ab00465avd6tpjbezj",
	})

	const asset1 = data && new Asset()
	const asset2 = data && new Asset(data)

	return (
		<Page title="Home" padding="8px" gap="8px">
			<Heading>Without provided Asset</Heading>
			<JSONObjectViewer data={asset1?.computedProperties} />
			<Heading>With provided Asset</Heading>
			<JSONObjectViewer data={asset2?.computedProperties} />
		</Page>
	)
}

Index.auth = false
export default Index
