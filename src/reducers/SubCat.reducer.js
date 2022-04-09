import { DELETE_SUBCATEGORY, GET_SUBCATEGORY_LIST } from "../constants/Type";

const initialState = {
  subcategory: null,
  loading: true,
};

const SubCat = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBCATEGORY_LIST:
      return {
        ...state,
        subcategory: payload,
        loading: false,
      };
    case DELETE_SUBCATEGORY:
      return {
        ...state,
        subcategory: state.subcategory.filter(
          (subcategory) => subcategory._id !== payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default SubCat;
