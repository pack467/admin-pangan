import type { ThunkAction } from "redux-thunk";
import type {
  ProductTypeAction,
  ProductTypeState,
} from "../reducers/productTypes";
import request from "../lib/axios";
import type { ProductTypeAttributes } from "../interfaces/productTypes";
import { GETALLPRODUCTTYPES } from "../constant/productTypeReducer";

export const getAllProductTypes = (): ThunkAction<
  Promise<void>,
  ProductTypeState,
  any,
  ProductTypeAction
> => async (dispatch) => {
  const {
    data: { data },
    status,
  } = await request.Query<ProductTypeAttributes[]>({
    url: "/product-type",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });

  dispatch<ProductTypeAction<ProductTypeAttributes[]>>({
    type: GETALLPRODUCTTYPES,
    payload: status !== 200 ? [] : (data as ProductTypeAttributes[]),
  });
};
