import type { ThunkAction } from "redux-thunk";
import request from "../lib/axios";
import type {
  CreateProductInput,
  ProductAttributes,
  ProductAttributesWithImages,
} from "../interfaces/product";
import type { ProductAction, ProductState } from "../reducers/product";
import { ADDPRODUCTTYPES, GETALLPRODUCTS } from "../constant/product";
import type { ImageInput } from "../interfaces";
import type { BaseQuery } from "../interfaces/request";

export const addProduct = (
  payload: CreateProductInput & { image: ImageInput[] }
): ThunkAction<
  Promise<ProductAttributes>,
  ProductState,
  any,
  ProductAction
> => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();

      payload.image.forEach((el) => {
        formData.append("productImg", el.file, el.file.name);
      });
      formData.append("name", payload.name);
      formData.append("desc", payload.desc);
      formData.append("typeId", payload.typeId);
      formData.append("stock", payload.stock.toString());
      formData.append("price", payload.price.toString());

      const {
        data: { data, message },
        status,
      } = await request.Mutation<ProductAttributes>({
        url: "/product",
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: formData,
      });

      if (status !== 201) throw { message };

      dispatch<ProductAction<ProductAttributes>>({
        type: ADDPRODUCTTYPES,
        payload: data,
      });

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const getAllProduct = ({
  page,
  limit,
}: BaseQuery): ThunkAction<
  Promise<ProductAttributesWithImages[]>,
  ProductState,
  any,
  ProductAction
> => async (dispatch) => {
  const {
    data: { data },
    status,
  } = await request.Query<ProductAttributesWithImages[]>({
    url: "/product",
    params: {
      page,
      limit,
    },
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });

  dispatch<any>({
    type: GETALLPRODUCTS,
    payload: data,
  });

  return status !== 200 ? [] : data;
};
