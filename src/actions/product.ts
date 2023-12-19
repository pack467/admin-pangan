import type { ThunkAction } from "redux-thunk";
import request from "../lib/axios";
import type {
  AddCarouselInput,
  CarouselAttributes,
  CarrouselWithProduct,
  CreateProductInput,
  ProductAttributes,
  ProductAttributesWithImages,
} from "../interfaces/product";
import type { ProductAction, ProductState } from "../reducers/product";
import {
  ADDCAROUSEL,
  ADDPRODUCTTYPES,
  GETALLCAROUSEL,
  GETALLPRODUCTS,
} from "../constant/product";
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

export const addCarousel = (
  payload: AddCarouselInput
): ThunkAction<
  Promise<CarouselAttributes>,
  ProductState,
  any,
  ProductAction
> => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { message },
      } = await request.Mutation({
        method: "POST",
        url: "/carrousel/",
        data: payload,
        headers: { access_token: localStorage.getItem("access_token") },
      });

      if (status !== 201) throw { message };

      dispatch<any>({
        type: ADDCAROUSEL,
        payload,
      });

      resolve({ ...payload, createdAt: new Date(), updatedAt: new Date() });
    } catch (err) {
      reject(err);
    }
  });

export const getAllCarousel = (): ThunkAction<
  Promise<CarrouselWithProduct[]>,
  ProductState,
  any,
  ProductAction
> => async (dispatch) => {
  const {
    data: { data },
    status,
  } = await request.Query({
    url: "/carrousel/",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });

  const payload = status !== 200 ? [] : data;

  dispatch<any>({
    type: GETALLCAROUSEL,
    payload,
  });

  return payload;
};
