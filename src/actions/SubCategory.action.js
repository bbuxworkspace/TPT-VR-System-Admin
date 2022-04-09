import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_SUBCATEGORY,
  CREATE_SUBCATEGORY_ERROR,
  DELETE_SUBCATEGORY,
  DELETE_SUBCATEGORY_ERROR,
  GET_SUBCATEGORY_LIST,
  UPDATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import { getRefreshToken } from "./Dashboard.action";

//GET SubCategory LIST
export const getSubCategoryList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/subCategory/${id}`);

    dispatch({
      type: GET_SUBCATEGORY_LIST,
      payload: res.data.subCategorys,
    });
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(getSubCategoryList(id));
    } else {
      console.log(err);
    }
  }
};

// CREATE SubCategory
export const createSubCategory = (values, id) => async (dispatch) => {
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
      `${BASE_URL}/api/v1/subCategory/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: CREATE_SUBCATEGORY,
    });
    toast.success("Sub Category created successfully");
    dispatch(getSubCategoryList(id));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(createSubCategory(values, id));
    } else {
      dispatch({
        type: CREATE_SUBCATEGORY_ERROR,
      });
    }

    return false;
  }
};

// Update SubCategory
export const updateSubCategory = (values, id, catId) => async (dispatch) => {
  let formData = {
    name: values.name,
    categoryId: catId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.patch(
      `${BASE_URL}/api/v1/subCategory/${id}`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: UPDATE_SUBCATEGORY,
    });
    toast.success("Sub Category updated successfully");
    dispatch(getSubCategoryList(catId));
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(updateSubCategory(values, id, catId));
    } else {
      dispatch({
        type: UPDATE_SUBCATEGORY_ERROR,
      });
    }

    return false;
  }
};

//DELETE  SubCategory
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/v1/subCategory/${id}`);
    dispatch({
      type: DELETE_SUBCATEGORY,
      payload: id,
    });
    return true;
  } catch (err) {
    if (err.response.status === 401) {
      await dispatch(getRefreshToken());
      await dispatch(deleteSubCategory(id));
    } else {
      dispatch({
        type: DELETE_SUBCATEGORY_ERROR,
      });
    }

    return false;
  }
};
