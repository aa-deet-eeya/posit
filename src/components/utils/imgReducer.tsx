export type imgObj = {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
};

type ActionI =
  | { type: "STACK_IMAGES"; images: imgObj[] }
  | { type: "NEW_IMAGES"; images: imgObj[] }
  | { type: "FETCHING_IMAGES"; fetching: boolean };

type StateI = {
  images: imgObj[];
  fetching: boolean;
};

export const imgReducer = (state: StateI, action: ActionI) => {
  switch (action.type) {
    case "STACK_IMAGES":
      return { ...state, images: state.images.concat(action.images) };
    case "NEW_IMAGES":
      return { ...state, images: action.images };
    case "FETCHING_IMAGES":
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
};
