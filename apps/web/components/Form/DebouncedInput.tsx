import { ChangeEvent, FC, useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { Input, InputProps } from "@mantine/core";

type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "value" | "onChange">;

export const DebouncedInput: FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [debouncedValue] = useDebounce<string | number>(value, debounce);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input {...props} size="sm" value={value} onChange={handleChange} />;
};
