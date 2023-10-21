type Action = {
  type: string;
  payload?: any;
};

const bookmark_reducer = (state: number[], action: Action) => {
  switch (action.type) {
    case "SET_BOOKMARKS":
      return action.payload;
    case "ADD_BOOKMARK":
      return [...state, action.payload];
    case "REMOVE_BOOKMARK":
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default bookmark_reducer;
