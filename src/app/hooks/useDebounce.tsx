import { useEffect, useState } from "react";

export function useDebounce(value: string | number, delay: number): typeof value {
  const [debouncedValue, setDebouncedValue] = useState<typeof value>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
