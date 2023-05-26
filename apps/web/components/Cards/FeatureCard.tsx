import type { Feature } from "../Cards/Features";

import {
  Box,
  chakra,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export function FeatureCard({ icon, heading, content }: Feature) {
  return (
    <Box
      key={`feature_element${heading}`}
      bg={useColorModeValue("gray.100", "gray.900")}
      p={6}
      rounded="lg"
      textAlign="center"
      pos="relative"
      height="100%"
    >
      <Flex
        p={2}
        w="max-content"
        color="white"
        bgGradient="linear(to-br, #228be6, #15aabf)"
        rounded="md"
        marginInline="auto"
        pos="absolute"
        left={0}
        right={0}
        top="-1.5rem"
        boxShadow="lg"
      >
        <>{icon}</>
      </Flex>
      <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
        {heading}
      </chakra.h3>
      <Text fontSize="md" mt={4}>
        {content}
      </Text>
      <Link href="#" mt={4} fontSize="sm" color="blue.400">
        Learn more →
      </Link>
    </Box>
  );
}
