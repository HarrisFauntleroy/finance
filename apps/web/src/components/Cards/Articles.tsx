/**
 *
 * Simple vertical map of articles
 *
 */
import React from "react"

import { Container, Flex, chakra } from "@chakra-ui/react"
import type { IconType } from "react-icons"
import ArticleCard from "~/components/Cards/ArticleCard"
import LineWithDot from "~/components/Cards/LineWIthDot"

type Category = string[]

type Article = {
	id: number
	categories: Category
	title: string
	icon: IconType
	description: string
	date: string
}

type ArticlesProps = {
	articles: Article[]
}

function Articles({ articles }: ArticlesProps) {
	return (
		<Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
			<chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
				Articles
			</chakra.h3>
			{articles.map((milestone) => (
				<Flex key={milestone.id} mb="10px">
					<LineWithDot />
					<ArticleCard {...milestone} />
				</Flex>
			))}
		</Container>
	)
}

export default Articles
