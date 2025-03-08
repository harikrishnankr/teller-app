type State = {
  transactionRefreshToken: number;
};

type Action =
  | { type: "TRANSACTION_REFRESH" }
  | { type: "UPDATE_STATE" };

type ProtectedContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
