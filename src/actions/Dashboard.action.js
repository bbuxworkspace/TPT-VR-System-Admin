import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
  LOGOUT_FAIL,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

// LOGIN ACTION
export const login = (values) => async (dispatch) => {
  let formData = {
    password: values.password,
    phone: values.email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(getRefreshToken());
    toast.success("Logged in successfully");
    return true;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    console.log(err);
    toast.error(err.response.data.message);
    return false;
  }
};

//LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success("Logged out successfully");

    dispatch({
      type: LOGOUT_SUCCESS,
    });

    return true;
    //}
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
    console.log(error);
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};

//GET REFRESH TOKEN
export const getRefreshToken = () => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/v1/auth/refreshToken`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    //if (refreshRes.status === 200) {
    localStorage.setItem("token_book", refreshRes.data.accessToken);

    setAuthToken(refreshRes.data.accessToken);

    dispatch({
      type: ACCESS_TOKEN_SUCCESS,
      payload: refreshRes.data.accessToken,
    });
    dispatch(getProfileData());

    return true;
    //}
  } catch (error) {
    dispatch({
      type: ACCESS_TOKEN_ERROR,
    });
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};

//GET Profile DATA
export const getProfileData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/profile/`, {
      withCredentials: true,
    });
    // console.log(res);
    //if (refreshRes.status === 200) {
    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data.user,
    });

    return true;
    //}
  } catch (error) {
    dispatch({
      type: AUTH_USER_LOAD_ERROR,
    });
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};
