import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_INTO_COLLECTION,
  ADD_INTO_COLLECTION_ERROR,
  GET_COLLECTION_DETAILS,
  GET_COLLECTION_DETAILS_ERROR,
  REMOVE_FROM_COLLECTION,
  REMOVE_FROM_COLLECTION_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET collection DETAILS
export const getCollectionDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/collection/${id}`);
    dispatch({
      type: GET_COLLECTION_DETAILS,
      payload: res.data.collection,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getCollectionDetails(id));
    } else {
      dispatch({
        type: GET_COLLECTION_DETAILS_ERROR,
      });
      console.log(err);
    }
  }
};

// addBookToCollection
export const addBookToCollection = (values, id) => async (dispatch) => {
  const formData = {
    id: values,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    await axios.put(
      `${BASE_URL}/api/v1/collection/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: ADD_INTO_COLLECTION,
    });
    toast.success("Book added successfully");
    dispatch(getCollectionDetails(id));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(addBookToCollection(values, id));
    } else {
      dispatch({
        type: ADD_INTO_COLLECTION_ERROR,
      });
    }

    return false;
  }
};

// removeBookToCollection
export const removeBookToCollection = (values, id) => async (dispatch) => {
  const formData = {
    id: values,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    await axios.patch(
      `${BASE_URL}/api/v1/collection/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: REMOVE_FROM_COLLECTION,
    });
    toast.success("Book removed successfully");
    dispatch(getCollectionDetails(id));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(removeBookToCollection(values, id));
    } else {
      dispatch({
        type: REMOVE_FROM_COLLECTION_ERROR,
      });
    }

    return false;
  }
};
