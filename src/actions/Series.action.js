import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_SERIES,
  CREATE_SERIES_ERROR,
  DELETE_SERIES,
  DELETE_SERIES_ERROR,
  GET_SERIES_DETAILS,
  GET_SERIES_DETAILS_ERROR,
  GET_SERIES_LIST,
  UPDATE_SERIES,
  UPDATE_SERIES_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET Series LIST
export const getSeriesList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/series`);

    dispatch({
      type: GET_SERIES_LIST,
      payload: res.data.series,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getSeriesList());
    } else {
      console.log(err);
    }
  }
};

//GET Series DETAILS
export const getSeriesDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/series/${id}`);
    dispatch({
      type: GET_SERIES_DETAILS,
      payload: res.data.series,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getSeriesDetails(id));
    } else {
      dispatch({
        type: GET_SERIES_DETAILS_ERROR,
      });
      console.log(err);
    }
  }
};

// CREATE Series
export const createSeries = (values, books) => async (dispatch) => {
  if (books && books.length === 0) {
    toast.error("Please add at least one book");
    return false;
  }
  const formData = {
    name: values.name,
    books: books,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/series`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: CREATE_SERIES,
    });
    toast.success("Series created successfully");
    dispatch(getSeriesList());
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createSeries(values, books));
      return true;
    } else {
      dispatch({
        type: CREATE_SERIES_ERROR,
      });
    }

    return false;
  }
};

// Update Series
export const updateSeries = (values, books, id) => async (dispatch) => {
  if (books && books.length === 0) {
    toast.error("Please add at least one book");
    return false;
  }
  const formData = {
    name: values.name,
    books: books,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(
      `${BASE_URL}/api/v1/series/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_SERIES,
    });
    toast.success("Series updated successfully");
    dispatch(getSeriesList());
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updateSeries(values, books, id));
    } else {
      dispatch({
        type: UPDATE_SERIES_ERROR,
      });
    }

    return false;
  }
};

//DELETE  series
export const deleteSeries = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/series/${id}`);
    dispatch({
      type: DELETE_SERIES,
      payload: id,
    });
    dispatch(getSeriesList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(deleteSeries(id));
      return true;
    } else {
      dispatch({
        type: DELETE_SERIES_ERROR,
      });
    }

    return false;
  }
};
