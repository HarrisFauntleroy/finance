/**
 *
 * Pricing page
 *
 */
import React from "react"

import { Body, Page, PricingCard } from "ui"

const Pricing = () => {
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