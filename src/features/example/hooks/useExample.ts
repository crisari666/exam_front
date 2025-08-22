import { useState, useCallback } from 'react';

type UseExampleReturn = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useExample = (initialValue: number = 0): UseExampleReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};
