import type { ReactNode } from "react"
import React from "react"

import { Container } from "@chakra-ui/react"
import FeatureCard from "~/components/Cards/FeatureCard"
import { Grid } from "~/components/Grid"

export type Feature = {
	heading: string
	content: string
	icon: ReactNode
}

type FeaturesProps = {
	features: Feature[]
}

function Features({ features }: FeaturesProps) {
	return (
		<Container maxW="6xl" p={{ base: 5, md: 10 }}>
			<Grid gap={10}>{features.map(FeatureCard)}</Grid>
		</Container>
	)
}

export default Features
