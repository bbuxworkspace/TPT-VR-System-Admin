import { GET_CATEGORY_LIST } from "../constants/Type";

const initialState = {
  category: null,
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
