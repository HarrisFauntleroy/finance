/**
 *
 * Simple vertical map of milestones
 *
 */
import React from "react"

import { Container, Flex, chakra, useBreakpointValue } from "@chakra-ui/react"
import EmptyCard from "~/components/Cards/EmptyCard"
import LineWithDot from "~/components/Cards/LineWIthDot"
import MilestoneCard from "~/components/Cards/MilestoneCard"

export type Milestone = {
	id: number
	date: string
	title: string
	description: string
}

type MilestonesProps = {
	title?: string
	milestones: Milestone[]
}

function Milestones({ title, milestones }: MilestonesProps) {
	const isMobile = useBreakpointValue({ base: true, md: false })
	const isDesktop = useBreakpointValue({ base: false, md: true })

	return (
		<Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
			{title && (
				<chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
					{title}
				</chakra.h3>
			)}
			{milestones.map((milestone) => (
				<Flex key={milestone.id} mb="10px">
					{/* Desktop view(left card) */}
					{isDesktop && milestone.id % 2 === 0 && (
						<>
							<EmptyCard />
							<LineWithDot />
							<MilestoneCard {...milestone} />
						</>
					)}

					{/* Mobile view */}
					{isMobile && (
						<>
							<LineWithDot />
							<MilestoneCard {...milestone} />
						</>
					)}

					{/* Desktop view(right card) */}
					{isDesktop && milestone.id % 2 !== 0 && (
						<>
							<MilestoneCard {...milestone} />

							<LineWithDot />
							<EmptyCard />
						</>
					)}
				</Flex>
			))}
		</Container>
	)
}

export default Milestones
