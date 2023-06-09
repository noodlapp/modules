import React, { useCallback, useState } from "react";
import { defineReactNode } from '@noodl/noodl-sdk';

export const CounterContext = React.createContext({
  count: 0,
  increment: null,
});

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <CounterContext.Provider
      value={{
        count,
        increment
      }}
    >
      {children}
    </CounterContext.Provider>
  )
}

export function useCounterContext() {
  const context = React.useContext(CounterContext);

  if (context === undefined) {
    throw new Error('useCounterContext must be a child of CounterProvider');
  }

  return context;
}

export default defineReactNode({
	name: 'Counter Provider',
	allowChildren: true,
	getReactComponent() {
		return CounterProvider;
	}
});
