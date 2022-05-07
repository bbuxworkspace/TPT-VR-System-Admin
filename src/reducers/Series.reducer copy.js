import {
  DELETE_SERIES,
  GET_SERIES_DETAILS,
  GET_SERIES_LIST,
} from "../constants/Type";

const initialState = {
  series: null,
  selected_series: null,
  loading: true,
};

const seriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERIES_LIST:
      return {
        ...state,
        series: payload,
        loading: false,
      };
    case GET_SERIES_DETAILS:
      return {
        ...state,
        selected_series: payload,
        loading: false,
      };
    case DELETE_SERIES:
      return {
        ...state,
        series: {
          ...state.series,
          items: [...state.series.items.filter((pub) => pub._id !== payload)],
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default seriesReducer;
