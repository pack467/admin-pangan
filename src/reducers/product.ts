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
  RESETPRODUCT,
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
        products: [],
      };
    case GETALLPRODUCTS:
      return {
        ...state,
        products: payload || [],
      };
    case ADDCAROUSEL:
      return {
        ...state,
        carrousels: [],
      };
    case GETALLCAROUSEL:
      return {
        ...state,
        carrousels: payload,
      };
    case RESETPRODUCT:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export default reducer;
