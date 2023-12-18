import type { Reducer } from "redux";
import type { ProductTypeAttributes } from "../interfaces/productTypes";
import {
  GETALLPRODUCTTYPES,
  ProductTypesReducerType,
} from "../constant/productTypeReducer";

export interface ProductTypeState {
  productTypes: ProductTypeAttributes[];
}

export type ProductTypeAction<T = any> = {
  type: ProductTypesReducerType;
  payload: T;
};

const initialState: ProductTypeState = { productTypes: [] };

const reducer: Reducer<ProductTypeState, ProductTypeAction> = (
  state = initialState as ProductTypeState,
  { type, payload }
) => {
  switch (type) {
    case GETALLPRODUCTTYPES:
      return {
        ...state,
        productTypes: payload,
      };
    default:
      return state;
  }
};

export default reducer;
