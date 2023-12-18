import type { Reducer } from "redux";
import type { ProductAttributes } from "../interfaces/product";
import { ADDPRODUCTTYPES, type ProductTypes } from "../constant/product";

export interface ProductState {
  products: ProductAttributes[];
}

export type ProductAction<T = any> = {
  type: ProductTypes;
  payload: T;
};

const initialState: ProductState = { products: [] };

const reducer: Reducer<ProductState, ProductAction> = (
  state = initialState as ProductState,
  { type, payload }
) => {
  switch (type) {
    case ADDPRODUCTTYPES:
      return {
        ...state,
        products: [...state.products, payload],
      };
    default:
      return state;
  }
};

export default reducer;
