import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PLAYER,
  CREATE_PLAYER_ERROR,
  DELETE_PLAYER,
  DELETE_PLAYER_ERROR,
  GET_PLAYER_DETAILS,
  GET_PLAYER_DETAILS_ERROR,
  GET_PLAYER_LIST,
  UPDATE_PLAYER,
  UPDATE_PLAYER_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

//GET PLAYER LIST
export const getPlayerList = (gameId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.get(`${BASE_URL}/api/playerList?gameId=${gameId}`);
    // console.log(res);

    if (res.data.code === 200) {
      dispatch({
        type: GET_PLAYER_LIST,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//GET PLAYER DETAILS
export const getPlayerDetails = (playerUniqueId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.get(
      `${BASE_URL}/api/singlePlayer?playerUniqueId=${playerUniqueId}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: GET_PLAYER_DETAILS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PLAYER_DETAILS_ERROR,
    });
  }
};

// CREATE PLAYER
export const createPlayer = (values, gameId) => async (dispatch) => {
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
      `${BASE_URL}/api/playerCreate`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: CREATE_PLAYER,
      });
      toast.success("Player created successfully");
      dispatch(getPlayerList(gameId));
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: CREATE_PLAYER_ERROR,
    });
    console.log(err);
    return false;
  }
};

// CREATE PLAYER
export const updatePlayer = (values, gameId, id) => async (dispatch) => {
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
      `${BASE_URL}/api/playerUpdate/${id}`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: UPDATE_PLAYER,
      });
      toast.success("Player updated successfully");
      dispatch(getPlayerList(gameId));
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: UPDATE_PLAYER_ERROR,
    });
    console.log(err);
    return false;
  }
};

//DELETE  PLAYER
export const deletePlayer = (playerUniqueId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.delete(
      `${BASE_URL}/api/deletePlayer?playerUniqueId=${playerUniqueId}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: DELETE_PLAYER,
        payload: playerUniqueId,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    dispatch({
      type: DELETE_PLAYER_ERROR,
    });

    return false;
  }
};
