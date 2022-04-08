import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import gameReducer from "./Game.reducer";

const reducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

export default reducer;
