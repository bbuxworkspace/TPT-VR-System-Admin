import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_BOOK,
  CREATE_BOOK_ERROR,
  DELETE_BOOK,
  DELETE_BOOK_ERROR,
  GET_BOOK_DETAILS,
  GET_BOOK_DETAILS_ERROR,
  GET_BOOK_LIST,
  UPDATE_BOOK,
  UPDATE_BOOK_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET book LIST
export const getBookList = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/book?page=${page}&limit=100`
    );

    dispatch({
      type: GET_BOOK_LIST,
      payload: res.data.books,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getBookList(page));
    } else {
      console.log(err);
    }
  }
};

//GET book DETAILS
export const getBookDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/book/${id}`);
    dispatch({
      type: GET_BOOK_DETAILS,
      payload: res.data.book,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getBookDetails(id));
    } else {
      dispatch({
        type: GET_BOOK_DETAILS_ERROR,
      });
      console.log(err);
    }
  }
};

// CREATE book
export const createbook = (values, image) => async (dispatch) => {
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
    const res = await axios.post(`${BASE_URL}/api/v1/book`, formData, config);
    dispatch({
      type: CREATE_BOOK,
    });
    toast.success("book created successfully");
    dispatch(getBookList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createbook(values, image));
      return true;
    } else {
      dispatch({
        type: CREATE_BOOK_ERROR,
      });
    }

    return false;
  }
};

// Update book
export const updatebook = (values, image, id) => async (dispatch) => {
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
      `${BASE_URL}/api/v1/book/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_BOOK,
    });
    toast.success("book updated successfully");
    dispatch(getBookList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updatebook(values, image, id));
    } else {
      dispatch({
        type: UPDATE_BOOK_ERROR,
      });
    }

    return false;
  }
};

//DELETE  book
export const deletebook = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/book/${id}`);
    dispatch({
      type: DELETE_BOOK,
      payload: id,
    });
    dispatch(getBookList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(deletebook(id));
      return true;
    } else {
      dispatch({
        type: DELETE_BOOK_ERROR,
      });
    }

    return false;
  }
};
