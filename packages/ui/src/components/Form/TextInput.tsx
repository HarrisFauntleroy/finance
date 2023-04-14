import type { InputProps as ChakraInputProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import type { ValidationRule } from 'react-hook-form';

type InputProps = {
  name: string;
  label: string;
  inputProps?: ChakraInputProps;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  validation?: Partial<{
    required: string | ValidationRule<boolean>;
    minLength: ValidationRule<number>;
    maxLength: ValidationRule<number>;
  }>;
};

export const TextInput = ({
  name,
  label,
  inputProps,
  register,
  error,
  validation,
}: InputProps) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input id={name} {...register(name, validation)} {...inputProps} />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
