import type { Reducer } from "redux";
import type {
  CarrouselWithProduct,
  ProductAttributesWithImages,
} from "../interfaces/product";
import {
  ADDCAROUSEL,
  ADDPRODUCTTYPES,
  GETALLCAROUSEL,
  GETALLPRODUCTS,
  type ProductTypes,
} from "../constant/product";

export interface ProductState {
  products: ProductAttributesWithImages[];
  carrousels: CarrouselWithProduct[];
}

export type ProductAction<T = any> = {
  type: ProductTypes;
  payload: T;
};

const initialState: ProductState = { products: [], carrousels: [] };

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
        products: [...state.products, ...(payload || [])],
      };
    case ADDCAROUSEL:
      return {
        ...state,
        carrousels: [...state.carrousels, payload],
      };
    case GETALLCAROUSEL:
      return {
        ...state,
        carrousels: payload,
      };
    default:
      return state;
  }
};

export default reducer;
