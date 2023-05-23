import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  debounce: number
): [T, Dispatch<SetStateAction<T>>] {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce]);

  return [debouncedValue, setDebouncedValue];
}
