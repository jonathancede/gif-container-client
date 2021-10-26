import { combineReducers } from "redux";
import isAuthorizedReducer from "./isAuthorized/reducer";

const reducers = combineReducers({
  isAuthorized: isAuthorizedReducer,
});

export default reducers;
