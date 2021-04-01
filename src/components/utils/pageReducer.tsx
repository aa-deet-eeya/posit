type ActionI = { type: "ADVANCE_PAGE" } | { type: "RESET_PAGE" };
type StateI = { page: number };

export const pageReducer = (state: StateI, action: ActionI) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 1 };
    case "RESET_PAGE":
      return { ...state, page: 1 };
    default:
      return state;
  }
};
