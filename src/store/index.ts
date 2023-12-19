import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
  type Action,
} from "redux";
import { thunk } from "redux-thunk";
import productTypeReducer, {
  type ProductTypeState,
  type ProductTypeAction,
} from "../reducers/productTypes";
import productReducer, {
  type ProductState,
  type ProductAction,
} from "../reducers/product";
import type { ProductTypeAttributes } from "../interfaces/productTypes";
import type { ProductAttributesWithImages } from "../interfaces/product";

export type RootReducer = {
  productTypeReducer: ProductTypeState;
  productReducer: ProductState;
};

const rootReducer: Reducer<
  RootReducer,
  ProductTypeAction<ProductTypeAttributes> & ProductAction<ProductAttributesWithImages>,
  any
> = combineReducers({ productTypeReducer, productReducer });

export default createStore(rootReducer, applyMiddleware(thunk));


