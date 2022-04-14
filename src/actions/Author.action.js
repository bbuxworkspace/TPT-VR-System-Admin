import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_AUTHOR,
  CREATE_AUTHOR_ERROR,
  DELETE_AUTHOR,
  DELETE_AUTHOR_ERROR,
  GET_AUTHOR_DETAILS,
  GET_AUTHOR_DETAILS_ERROR,
  GET_AUTHOR_LIST,
  UPDATE_AUTHOR,
  UPDATE_AUTHOR_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET Author LIST
export const getAuthorList = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/author?page=${page}&limit=9999999`
    );

    dispatch({
      type: GET_AUTHOR_LIST,
      payload: res.data.authors,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getAuthorList(page));
    } else {
      console.log(err);
    }
  }
};

//GET Author DETAILS
export const getAuthorDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/author/${id}`);
    dispatch({
      type: GET_AUTHOR_DETAILS,
      payload: res.data.author,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getAuthorDetails(id));
    } else {
      dispatch({
        type: GET_AUTHOR_DETAILS_ERROR,
      });
      console.log(err);
    }
  }
};

// CREATE Author
export const createAuthor = (values, image) => async (dispatch) => {
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
    const res = await axios.post(`${BASE_URL}/api/v1/author`, formData, config);
    dispatch({
      type: CREATE_AUTHOR,
    });
    toast.success("Author created successfully");
    dispatch(getAuthorList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createAuthor(values, image));
      return true;
    } else {
      dispatch({
        type: CREATE_AUTHOR_ERROR,
      });
    }

    return false;
  }
};

// Update Author
export const updateAuthor = (values, image, id) => async (dispatch) => {
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
      `${BASE_URL}/api/v1/author/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_AUTHOR,
    });
    toast.success("Author updated successfully");
    dispatch(getAuthorList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updateAuthor(values, image, id));
    } else {
      dispatch({
        type: UPDATE_AUTHOR_ERROR,
      });
    }

    return false;
  }
};

//DELETE  Author
export const deleteAuthor = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/author/${id}`);
    dispatch({
      type: DELETE_AUTHOR,
      payload: id,
    });
    dispatch(getAuthorList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(deleteAuthor(id));
      return true;
    } else {
      dispatch({
        type: DELETE_AUTHOR_ERROR,
      });
    }

    return false;
  }
};
