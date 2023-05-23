import { Suspense } from "react";

import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Controller, useFormContext } from "react-hook-form";

type AutocompleteProps<T extends Record<string, string>> = {
  label: string;
  name: string;
  data: T[];
  error?: string;
};

export function Autocomplete<T extends Record<string, string>>({
  label,
  data,
}: AutocompleteProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors.userCurrency}>
      <FormLabel htmlFor="marketId">{label}</FormLabel>
      <Controller
        control={control}
        name="userCurrency"
        render={({ field }) => (
          <AutoComplete
            filter={(query, optionLabel) => optionLabel.includes(query)}
            maxSuggestions={10}
            onChange={(value) => {
              field.onChange(value);
            }}
          >
            <AutoCompleteInput
              size="sm"
              placeholder="Currency"
              onChange={field.onChange}
              value={field.value || ""}
              bg={"white.300"}
              _dark={{
                bg: "gray.700",
              }}
            />
            <AutoCompleteList>
              {data?.map((option, oid) => (
                <AutoCompleteItem
                  key={`option-${oid}`}
                  value={option.ticker}
                  textTransform="capitalize"
                >
                  <HStack alignItems="center">
                    <Suspense fallback={<SkeletonCircle size="10" />}>
                      <Avatar
                        mr={2}
                        size="xs"
                        name={option.name}
                        src={option.image || option.name}
                      />
                    </Suspense>
                    <Text>
                      {option.name}: ({option.ticker})
                    </Text>
                  </HStack>
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        )}
      />
      <FormErrorMessage>
        {errors.userCurrency?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
}
