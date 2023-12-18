import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
} from "redux";
import { thunk } from "redux-thunk";
import productTypeReducer, {
  type ProductTypeState,
  type ProductTypeAction,
} from "../reducers/productTypes";

const rootReducer: Reducer<
  { productTypeReducer: ProductTypeState },
  ProductTypeAction<any>,
  any
> = combineReducers({ productTypeReducer });

export default createStore(rootReducer, applyMiddleware(thunk));

export type RootReducer = ReturnType<typeof rootReducer>
