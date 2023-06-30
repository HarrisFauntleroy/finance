import { Input, InputProps } from "@mantine/core";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

type DebouncedInputProperties = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "value" | "onChange">;

export const DebouncedInput: FC<DebouncedInputProperties> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...properties
}) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(value, debounce);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input {...properties} size="sm" value={value} onChange={handleChange} />
  );
};
