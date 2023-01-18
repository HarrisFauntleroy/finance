/**
 *
 * Index page
 *
 */
import React from "react"

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
import { Page } from "ui"
import type { NextPageWithLayout } from "~/pages/_app"

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
	return <Page title="Home" padding="8px" gap="8px"></Page>
}

Index.auth = false
export default Index
