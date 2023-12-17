import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";

export default createStore(combineReducers({}), applyMiddleware(thunk));
