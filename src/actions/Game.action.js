import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_GAME,
  CREATE_GAME_ERROR,
  GET_GAME_LIST,
  SELECT_GAME,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { logout } from "./Dashboard.action";

// CREATE GAME
export const createGame = (values) => async (dispatch) => {
  if (localStorage.getItem("token_anbs")) {
    setAuthToken(localStorage.getItem("token_anbs"));
  }
  let formData = {
    gameName: values.name,
    shortCode: values.code,
    gameUniqueId: values.gameUniqueId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/gameCreate`,
      JSON.stringify(formData),
      config
    );
    if (res.data.status === 202) {
      dispatch({
        type: CREATE_GAME,
      });
      toast.success("Game created successfully");
      dispatch(getGameList(-1));
      return true;
    }
    return false;
  } catch (err) {
    dispatch({
      type: CREATE_GAME_ERROR,
    });
    console.log(err);
    return false;
  }
};

//GET GAME LIST
export const getGameList = (token) => async (dispatch) => {
  try {
    if (token !== -1) {
      setAuthToken(token);
    }
    const res = await axios.get(`${BASE_URL}/api/gameList`);
    // console.log(res);

    dispatch({
      type: GET_GAME_LIST,
      payload: res.data,
    });
    return true;
  } catch (err) {
    console.log(err);
    if (err.response.status === 401) {
      dispatch(logout());
      return false;
    }
  }
};

//GET GAME LIST
export const selectGame = (id) => (dispatch) => {
  console.log(id);
  dispatch({
    type: SELECT_GAME,
    payload: id,
  });
};
