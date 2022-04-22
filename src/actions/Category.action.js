import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  GET_CATEGORY_LIST,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET Category LIST
export const getCategoryList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/category`);

    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data.categorys,
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getCategoryList());
    } else {
      console.log(err);
    }
  }
};

// CREATE Category
export const createCategory = (values) => async (dispatch) => {
  let formData = {
    name: values.name,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/v1/category`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: CREATE_CATEGORY,
    });
    toast.success("Category created successfully");
    dispatch(getCategoryList());
    return true;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createCategory(values));
    } else {
      dispatch({
        type: CREATE_CATEGORY_ERROR,
      });
    }

    return false;
  }
};

// Update Category
export const updateCategory = (values, id) => async (dispatch) => {
  let formData = {
    name: values.name,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(
      `${BASE_URL}/api/v1/category/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: UPDATE_CATEGORY,
    });
    toast.success("Category updated successfully");
    dispatch(getCategoryList());
    return true;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updateCategory(values, id));
    } else {
      dispatch({
        type: UPDATE_CATEGORY_ERROR,
      });
    }

    return false;
  }
};

//DELETE  Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/category/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
    return true;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(deleteCategory(id));
    } else {
      dispatch({
        type: DELETE_CATEGORY_ERROR,
      });
    }

    return false;
  }
};
