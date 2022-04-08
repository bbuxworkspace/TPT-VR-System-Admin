import {
  DELETE_PLAYER,
  GET_GAME_LIST,
  GET_PLAYER_DETAILS,
  GET_PLAYER_LIST,
  GET_TEAM_DETAILS,
  GET_TEAM_LIST,
  SELECT_GAME,
} from "../constants/Type";

const initialState = {
  games: null,
  selected_game: JSON.parse(localStorage.getItem("game")) || null,
  players: null,
  teams: null,
  selected_player: null,
  selected_team: null,
  loading: true,
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GAME_LIST:
      return {
        ...state,
        games: payload.data,
        loading: false,
      };

    case GET_PLAYER_LIST:
      return {
        ...state,
        players: payload.data,
        loading: false,
      };
    case GET_TEAM_LIST:
      return {
        ...state,
        teams: payload.data,
        loading: false,
      };
    case GET_PLAYER_DETAILS:
      return {
        ...state,
        selected_player: payload.data,
        loading: false,
      };
    case DELETE_PLAYER:
      return {
        ...state,
        players: [
          ...state.players.filter(
            (player) => player.playerUniqueId !== payload
          ),
        ],
        selected_player: null,
        loading: false,
      };
    case GET_TEAM_DETAILS:
      return {
        ...state,
        selected_team: payload.data,
        loading: false,
      };
    case SELECT_GAME:
      localStorage.setItem(
        "game",
        JSON.stringify({
          ...state.games.filter((game) => game._id === payload)[0],
        })
      );
      return {
        ...state,
        selected_game: {
          ...state.games.filter((game) => game._id === payload)[0],
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
