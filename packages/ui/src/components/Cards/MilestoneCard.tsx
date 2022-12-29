/**
 *
 * Simple vertical map of milestones
 *
 */
import React from "react"

import {
	Box,
	HStack,
	Text,
	VStack,
	chakra,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react"

type CardProps = {
	id: number
	title: string
	description: string
	date: string
}

export function MilestoneCard({ id, title, description, date }: CardProps) {
	// For even id show card on left side
	// For odd id show card on right side
	const isEvenId = id % 2 === 0
	let borderWidthValue = isEvenId ? "15px 15px 15px 0" : "15px 0 15px 15px"
	let leftValue = isEvenId ? "-15px" : "unset"
	let rightValue = isEvenId ? "unset" : "-15px"

	const isMobile = useBreakpointValue({ base: true, md: false })
	if (isMobile) {
		leftValue = "-15px"
		rightValue = "unset"
		borderWidthValue = "15px 15px 15px 0"
	}

	return (
		<HStack
			flex={1}
			p={{ base: 3, sm: 6 }}
			backgroundColor={useColorModeValue("gray.100", "gray.700")}
			spacing={5}
			rounded="lg"
			alignItems="center"
			pos="relative"
			_before={{
				content: '""',
				w: "0",
				h: "0",
				borderColor: `transparent ${useColorModeValue(
					"#edf2f6",
					"#2D3748"
				)} transparent`,
				borderStyle: "solid",
				borderWidth: borderWidthValue,
				position: "absolute",
				left: leftValue,
				right: rightValue,
				display: "block",
			}}
		>
			<Box>
				<Text fontSize="lg" color={isEvenId ? "teal.400" : "blue.400"}>
					{date}
				</Text>
				<VStack spacing={2} mb={3} textAlign="left">
					<chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
						{title}
					</chakra.h1>
					<Text fontSize="md">{description}</Text>
				</VStack>
			</Box>
		</HStack>
	)
}
