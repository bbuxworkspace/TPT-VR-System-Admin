import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import categoryReducer from "./Category.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

export default reducer;
