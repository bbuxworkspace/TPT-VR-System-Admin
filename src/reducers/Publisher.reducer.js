import {
  DELETE_PUBLISHER,
  GET_PUBLISHER_DETAILS,
  GET_PUBLISHER_LIST,
} from "../constants/Type";

const initialState = {
  publisher: null,
  selected_publisher: null,
  loading: true,
};

const publisherReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PUBLISHER_LIST:
      return {
        ...state,
        publisher: payload,
        loading: false,
      };
    case GET_PUBLISHER_DETAILS:
      return {
        ...state,
        selected_publisher: payload,
        loading: false,
      };
    case DELETE_PUBLISHER:
      return {
        ...state,
        publisher: {
          ...state.publisher,
          items: [
            ...state.publisher.items.filter((pub) => pub._id !== payload),
          ],
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default publisherReducer;
