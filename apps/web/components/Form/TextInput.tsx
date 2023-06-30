import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type FormInputBase = {
  id?: string;
  name: string;
  label: string;
  hidden?: boolean;
  required?: boolean;
  error?: string;
};

type FormInput = FormInputBase & {
  type: "text" | "date";
  options?: never;
};

type SelectFormInput = FormInputBase & {
  type: "select";
  options?: string[];
};

type MultiSelectFormInput = FormInputBase & {
  type: "multi-select";
  options?: Record<string, unknown>[];
};

export type FormInputs = FormInput | SelectFormInput | MultiSelectFormInput;

export function TextInput({
  label,
  name,
  error,
  hidden,
  ...properties
}: FormInputs) {
  const context = useFormContext();
  return (
    <FormControl
      isInvalid={!!error}
      display={hidden ? "none" : "flex"}
      flexDir="column"
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...properties} {...context.register(name)} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
