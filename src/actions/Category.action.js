import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  GET_CATEGORY_DETAILS,
  GET_CATEGORY_DETAILS_ERROR,
  GET_CATEGORY_LIST,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

//GET Category LIST
export const getCategoryList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/category`);

    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data.categorys,
    });
  } catch (err) {
    console.log(err);
  }
};

//GET Category DETAILS
export const getCategoryDetails = (CATEGORYUniqueId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.get(
      `${BASE_URL}/api/singleCATEGORY?CATEGORYUniqueId=${CATEGORYUniqueId}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: GET_CATEGORY_DETAILS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_DETAILS_ERROR,
    });
  }
};

// CREATE Category
export const createCategory = (values, gameId) => async (dispatch) => {
  if (localStorage.getItem("token_anbs")) {
    setAuthToken(localStorage.getItem("token_anbs"));
  }
  let formData = {
    name: values.name,
    gameId: gameId,
    customGameId: values.customGameId,
    pictureUrl: values.pictureUrl,
    addtionalInfo: {
      test: "test data",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/CATEGORYCreate`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: CREATE_CATEGORY,
      });
      toast.success("CATEGORY created successfully");
      dispatch(getCategoryList(gameId));
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: CREATE_CATEGORY_ERROR,
    });
    console.log(err);
    return false;
  }
};

// CREATE Category
export const updateCategory = (values, gameId, id) => async (dispatch) => {
  if (localStorage.getItem("token_anbs")) {
    setAuthToken(localStorage.getItem("token_anbs"));
  }
  let formData = {
    name: values.name,
    gameId: gameId,
    customGameId: values.customGameId,
    pictureUrl: values.pictureUrl,
    addtionalInfo: {
      test: "test data",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.put(
      `${BASE_URL}/api/CATEGORYUpdate/${id}`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: UPDATE_CATEGORY,
      });
      toast.success("CATEGORY updated successfully");
      dispatch(getCategoryList(gameId));
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
    });
    console.log(err);
    return false;
  }
};

//DELETE  Category
export const deleteCategory = (CATEGORYUniqueId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.delete(
      `${BASE_URL}/api/deleteCATEGORY?CATEGORYUniqueId=${CATEGORYUniqueId}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: DELETE_CATEGORY,
        payload: CATEGORYUniqueId,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_ERROR,
    });

    return false;
  }
};
