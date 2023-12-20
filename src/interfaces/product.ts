import type { ProductImgAttributes } from "./productImg";

export interface CreateProductInput {
  name: string;
  price: number;
  desc: string;
  stock: number;
  typeId: string;
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  desc?: string;
  stock?: number;
  status?: "available" | "not available" | "preorder";
}

export interface ProductAttributes {
  name: string;
  price: number;
  desc: string;
  stock: number;
  status: "available" | "not available" | "preorder";
  createdBy: string;
  readonly UUID: string;
  typeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductAttributesWithImages = ProductAttributes & {
  ProductImgs: ProductImgAttributes[];
};

export interface CarouselAttributes {
  productId: string;
  imageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCarouselInput {
  productId: string;
  imageId: string;
}

export type CarrouselWithProduct = CarouselAttributes & {
  Product: ProductAttributesWithImages;
};
