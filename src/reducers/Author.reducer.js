import {
  DELETE_AUTHOR,
  GET_AUTHOR_DETAILS,
  GET_AUTHOR_LIST,
} from "../constants/Type";

const initialState = {
  author: null,
  selected_author: null,
  loading: true,
};

const authorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTHOR_LIST:
      return {
        ...state,
        author: payload,
        loading: false,
      };
    case GET_AUTHOR_DETAILS:
      return {
        ...state,
        selected_author: payload,
        loading: false,
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        author: state.author.filter((auth) => auth._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default authorReducer;
