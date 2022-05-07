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
export const getSeriesList = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/series?page=${page}&limit=10000`
    );

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
      payload: res.data.book,
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
export const createSeries =
  (values, image, AudioFile, PdfFile) => async (dispatch) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("year", values.year);
    formData.append("edition", values.edition);
    formData.append("publisherId", values.publisher);
    formData.append("writerId", values.author);
    formData.append("categoryId", values.category);
    formData.append("subCategoryId", values.subcategory);
    formData.append("price", values.price);
    formData.append("page", values.page);
    formData.append("isbn", values.isbn);
    formData.append("description", values.description);

    if (image) {
      formData.append("image", image);
    }
    if (image) {
      formData.append("pdfFile", AudioFile);
    }
    if (image) {
      formData.append("audioFile", PdfFile);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/v1/series`,
        formData,
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
        await dispatch(createSeries(values, image));
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
export const updateSeries = (values, image, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("birth", values.birth);
  formData.append("death", values.death);
  formData.append("location", values.location);
  formData.append("description", values.description);

  if (image) {
    formData.append("image", image);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
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
      await dispatch(updateSeries(values, image, id));
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
