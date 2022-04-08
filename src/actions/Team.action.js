import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_TEAM,
  CREATE_TEAM_ERROR,
  GET_TEAM_DETAILS,
  GET_TEAM_DETAILS_ERROR,
  GET_TEAM_LIST,
  UPDATE_TEAM,
  UPDATE_TEAM_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

//GET TEAM LIST
export const getTeamList = (gameId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.get(`${BASE_URL}/api/teamList?gameId=${gameId}`);
    // console.log(res);

    if (res.data.code === 200) {
      dispatch({
        type: GET_TEAM_LIST,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//GET TEAM DETAILS
export const getTeamDetails = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.get(
      `${BASE_URL}/api/singleTeam?teamUniqueId=${id}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: GET_TEAM_DETAILS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_TEAM_DETAILS_ERROR,
    });
  }
};

// CREATE TEAM
export const createTeam = (values, gameId, team) => async (dispatch) => {
  if (localStorage.getItem("token_anbs")) {
    setAuthToken(localStorage.getItem("token_anbs"));
  }
  let formData = {
    teamUniqueId: values.teamUniqueId,
    teamName: values.name,
    tag: values.tag,
    mail: values.mail,
    phone: values.phone,
    gameId: gameId,
    pictureUrl: values.pictureUrl,
    playerId: team,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/teamCreate`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: CREATE_TEAM,
      });
      toast.success("Team created successfully");
      dispatch(getTeamList(gameId));
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: CREATE_TEAM_ERROR,
    });
    console.log(err);
    return false;
  }
};

// UPDATE TEAM
export const updateTeam = (values, gameId, team, id) => async (dispatch) => {
  if (localStorage.getItem("token_anbs")) {
    setAuthToken(localStorage.getItem("token_anbs"));
  }
  let formData = {
    teamUniqueId: values.teamUniqueId,
    teamName: values.name,
    tag: values.tag,
    mail: values.mail,
    phone: values.phone,
    gameId: gameId,
    pictureUrl: values.pictureUrl,
  };

  if (team && team.length > 0) {
    formData = { ...formData, playerId: team };
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.put(
      `${BASE_URL}/api/teamsUpdate/${id}`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: UPDATE_TEAM,
      });
      toast.success("Team updated successfully");
      dispatch(getTeamList());
      return true;
    } else if (res.data.code === 204) {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: UPDATE_TEAM_ERROR,
    });
    console.log(err);
    return false;
  }
};
