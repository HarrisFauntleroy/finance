/**
 *
 * Pricing page
 *
 */
import React from "react"

import { PricingCard } from "~/components/Cards/Pricing"
import Page from "~/components/Page"
import { Body } from "~/components/Page/Body"
import type { DefaultPage } from "~/pages/_app"

const Pricing: DefaultPage = () => {
	const features = [
		"Crypto and Stock tracking",
		"Budgets and Income support",
		"Net worth aggregation",
	]

	return (
		<Page title="Pricing">
			<Body>
				<PricingCard features={features} frequency={"/year"} cost={"TBA"} />
			</Body>
		</Page>
	)
}

Pricing.auth = false
export default Pricing
