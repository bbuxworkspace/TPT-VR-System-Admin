import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_USER_LOAD,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
} from "../constants/Type";

const initialState = {
  token: localStorage.getItem("token_anbs") || "",
  isAuthenticated: false,
  user: {},
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token_anbs", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        user: action.payload.data,
      };

    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        err: action.payload,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("token_anbs");
      return {
        ...state,
        token: "",
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
