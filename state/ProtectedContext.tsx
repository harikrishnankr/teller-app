"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";

const ProtectedContext = createContext<ProtectedContextType | undefined>(
  undefined
);

interface ProtectedProviderProps {
  children: ReactNode;
}

const initialState = {
  transactionRefreshToken: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TRANSACTION_REFRESH":
      return { transactionRefreshToken: state.transactionRefreshToken + 1 };
    default:
      return state;
  }
};

export function ProtectedProvider({ children }: ProtectedProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProtectedContext.Provider value={{ state, dispatch }}>
      {children}
    </ProtectedContext.Provider>
  );
}

export const useProtectedState = () => {
  const context = useContext(ProtectedContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
