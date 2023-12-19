import type { Reducer } from "redux";
import type { ProductAttributesWithImages } from "../interfaces/product";
import {
  ADDPRODUCTTYPES,
  GETALLPRODUCTS,
  type ProductTypes,
} from "../constant/product";

export interface ProductState {
  products: ProductAttributesWithImages[];
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
        products: [
          ...state.products,
          { ...payload, ProductImgs: payload.image },
        ],
      };
    case GETALLPRODUCTS:
      return {
        ...state,
        products: [...state.products, ...payload],
      };
    default:
      return state;
  }
};

export default reducer;
