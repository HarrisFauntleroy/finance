/**
 *
 * Index page
 *
 */
import React from "react"
import { Stack } from "@chakra-ui/react"
import * as ChartJs from "chart.js"
import { Page } from "ui"
import type { DefaultPage } from "~/pages/_app"
import Dashboard from "~/components/Portfolio/Dashboard"

ChartJs.Chart.register(
	ChartJs.CategoryScale,
	ChartJs.LinearScale,
	ChartJs.PointElement,
	ChartJs.LineElement,
	ChartJs.BarElement,
	ChartJs.ArcElement,
	ChartJs.Title,
	ChartJs.Tooltip,
	ChartJs.Legend,
	ChartJs.Filler
)

const Index: DefaultPage = () => {
	return (
		<Page title="Home" gap="8px">
			<Stack alignItems="center" padding="16px">
				<Dashboard />
			</Stack>
		</Page>
	)
}

Index.auth = false
export default Index
