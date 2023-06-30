import { useState } from "react";

/** Custom hook to persist to local storage in the manner of useState */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((value_: T) => T)) => void] => {
  /**
   * State to store our value
   * Pass initial state function to useState
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      /** Get from local storage by key */
      const localItem = window.localStorage.getItem(key);
      /** Parse stored json or if none return initialValue */
      return localItem ? JSON.parse(localItem) : initialValue;
    } catch (error) {
      /** If error also return initialValue */
      console.error(error);
      return initialValue;
    }
  });
  /**
   * Return a wrapped version of useState's setter function
   * that persists the new value to localStorage.
   */
  const setValue = (value: T | ((value_: T) => T)) => {
    try {
      /**
       * Allow value to be a function
       * so we have same API as useState
       */
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
};
