import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import authorReducer from "./Author.reducer";
import categoryReducer from "./Category.reducer";
import SubCat from "./SubCat.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  subcategory: SubCat,
  author: authorReducer,
});

export default reducer;
