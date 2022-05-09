import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import authorReducer from "./Author.reducer";
import bookReducer from "./Book.reducer";
import categoryReducer from "./Category.reducer";
import collectionReducer from "./Collection.reducer";
import publisherReducer from "./Publisher.reducer";
import seriesReducer from "./Series.reducer";
import SubCat from "./SubCat.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  subcategory: SubCat,
  author: authorReducer,
  publisher: publisherReducer,
  book: bookReducer,
  series: seriesReducer,
  collection: collectionReducer,
});

export default reducer;
