import {
  DELETE_BOOK,
  GET_BOOK_DETAILS,
  GET_BOOK_LIST,
} from "../constants/Type";

const initialState = {
  book: null,
  selected_book: null,
  loading: true,
};

const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOK_LIST:
      return {
        ...state,
        book: payload,
        loading: false,
      };
    case GET_BOOK_DETAILS:
      return {
        ...state,
        selected_book: payload,
        loading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        book: {
          ...state.book,
          items: [...state.book.items.filter((pub) => pub._id !== payload)],
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default bookReducer;
