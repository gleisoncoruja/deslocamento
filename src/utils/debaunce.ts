import { useRef } from "react";

interface IDebounceProps {
  fn: (...params: any[]) => void;
  delay: number;
}

export const useDebounce = ({ fn, delay }: IDebounceProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debouncedFn(...params: any[]) {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => {
      fn(...params);
    }, delay);
  }

  return debouncedFn;
};
