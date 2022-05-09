import { GET_COLLECTION_DETAILS } from "../constants/Type";

const initialState = {
  collection: null,
  loading: true,
};

const collectionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COLLECTION_DETAILS:
      return {
        ...state,
        collection: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default collectionReducer;
