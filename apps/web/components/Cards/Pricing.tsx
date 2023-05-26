import {
  chakra,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as bs from "react-icons/bs";

type PricingCardProps = {
  features?: string[];
  cost: string;
  frequency: string;
};

export function PricingCard({ features, cost, frequency }: PricingCardProps) {
  return (
    <Stack
      w="max-content"
      spacing={5}
      p={10}
      border="1px solid"
      borderColor={useColorModeValue("gray.400", "gray.600")}
      rounded="md"
      margin="0 auto"
      textAlign="center"
    >
      <chakra.h1 fontSize="7xl" fontWeight="400">
        {cost}{" "}
        <Text as="sub" fontSize="md" left="-10px">
          {frequency}
        </Text>
      </chakra.h1>

      {features?.map((text) => (
        <HStack key={text.slice(0, 20)} spacing={3}>
          <Icon as={bs.BsFillCheckCircleFill} h={6} w={6} color="green.400" />
          <Text fontSize="lg" color="gray.500">
            {text}
          </Text>
        </HStack>
      ))}
    </Stack>
  );
}
