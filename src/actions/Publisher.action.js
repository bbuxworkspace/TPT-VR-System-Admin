import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PUBLISHER,
  CREATE_PUBLISHER_ERROR,
  DELETE_PUBLISHER,
  DELETE_PUBLISHER_ERROR,
  GET_PUBLISHER_DETAILS,
  GET_PUBLISHER_DETAILS_ERROR,
  GET_PUBLISHER_LIST,
  UPDATE_PUBLISHER,
  UPDATE_PUBLISHER_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET Publisher LIST
export const getPublisherList = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/publisher?page=${page}&limit=9999999`
    );

    dispatch({
      type: GET_PUBLISHER_LIST,
      payload: res.data.publishers,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      return await dispatch(getPublisherList(page));
    } else {
      console.log(err);
    }
  }
};

//GET Publisher DETAILS
export const getPublisherDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/publisher/${id}`);
    dispatch({
      type: GET_PUBLISHER_DETAILS,
      payload: res.data.publisher,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getPublisherDetails(id));
    } else {
      dispatch({
        type: GET_PUBLISHER_DETAILS_ERROR,
      });
      console.log(err);
    }
  }
};

// CREATE Publisher
export const createPublisher = (values, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("location", values.location);

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
    const res = await axios.post(
      `${BASE_URL}/api/v1/publisher`,
      formData,
      config
    );
    dispatch({
      type: CREATE_PUBLISHER,
    });
    toast.success("Publisher created successfully");
    dispatch(getPublisherList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createPublisher(values, image));
      return true;
    } else {
      dispatch({
        type: CREATE_PUBLISHER_ERROR,
      });
    }

    return false;
  }
};

// Update Publisher
export const updatePublisher = (values, image, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("location", values.location);

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
      `${BASE_URL}/api/v1/publisher/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PUBLISHER,
    });
    toast.success("Publisher updated successfully");
    dispatch(getPublisherList(1));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updatePublisher(values, image, id));
    } else {
      dispatch({
        type: UPDATE_PUBLISHER_ERROR,
      });
    }

    return false;
  }
};

//DELETE  Publisher
export const deletePublisher = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/publisher/${id}`);
    dispatch({
      type: DELETE_PUBLISHER,
      payload: `${id}`,
    });
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      return await dispatch(deletePublisher(id));
    } else {
      dispatch({
        type: DELETE_PUBLISHER_ERROR,
      });
    }

    return false;
  }
};
