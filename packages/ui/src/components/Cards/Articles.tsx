import React from "react";

import { ArticleCard } from "../Cards/ArticleCard";
import { LineWithDot } from "../Cards/LineWIthDot";

import { chakra, Container, Flex } from "@chakra-ui/react";
import type { IconType } from "react-icons";

type Article = {
  id: number;
  categories: string[];
  title: string;
  icon: IconType;
  description: string;
  date: string;
};

type ArticlesProps = {
  articles: Article[];
};

export function Articles({ articles }: ArticlesProps) {
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
  );
}
