import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import categoryReducer from "./Category.reducer";
import SubCat from "./SubCat.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  subcategory: SubCat,
});

export default reducer;
