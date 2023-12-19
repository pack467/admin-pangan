import type { Reducer } from "redux";
import type {
  CarouselAttributes,
  ProductAttributesWithImages,
} from "../interfaces/product";
import {
  ADDCAROUSEL,
  ADDPRODUCTTYPES,
  GETALLPRODUCTS,
  type ProductTypes,
} from "../constant/product";

export interface ProductState {
  products: ProductAttributesWithImages[];
  carrousel: CarouselAttributes[];
}

export type ProductAction<T = any> = {
  type: ProductTypes;
  payload: T;
};

const initialState: ProductState = { products: [], carrousel: [] };

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
    case ADDCAROUSEL:
      return {
        ...state,
        carrousel:[...state.carrousel,payload]
      }
    default:
      return state;
  }
};

export default reducer;
