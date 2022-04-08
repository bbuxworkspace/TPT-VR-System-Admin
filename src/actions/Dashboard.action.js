import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

// LOGIN ACTION
export const login = (values) => async (dispatch) => {
  let formData = {
    password: values.password,
    userName: values.email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/login`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      setAuthToken(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      toast.success("Logged in successfully");
      return true;
    } else if (res.data.code === 203) {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    toast.error("Something went wrong");
    return false;
  }
};

//LOGOUT ACTION
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  toast.success("Logout successfully");
  return true;
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
    dispatch({
      type: ACCESS_TOKEN_SUCCESS,
      payload: refreshRes.data.accessToken,
    });
    setAuthToken(refreshRes.data.accessToken);

    return true;
    //}
  } catch (error) {
    dispatch({
      type: ACCESS_TOKEN_ERROR,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};
