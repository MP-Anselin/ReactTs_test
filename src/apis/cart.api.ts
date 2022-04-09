import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartManagementRequest } from "../dto/cart-management-request.dto";
import { Cart } from "../models/Cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/cart",
  }),
  endpoints: (build) => ({
    addProductInCart: build.mutation<any, CartManagementRequest>({
      query: (cartManagementRequest) => ({
        url: "product/add",
        method: "POST",
        body: cartManagementRequest,
        withCredentials: true,
      }),
    }),
    deleteProductInCart: build.mutation<any, CartManagementRequest>({
      query: (cartManagementRequest) => ({
        url: "product/remove",
        method: "POST",
        body: cartManagementRequest,
        withCredentials: true,
      }),
    }),
    getProductInCart: build.mutation<Cart, undefined>({
      query: (cartManagementRequest) => ({
        url: "products",
        method: "GET",
        withCredentials: true,
      }),
    }),
  }),
});

export const { useAddProductInCartMutation, useDeleteProductInCartMutation, useGetProductInCartMutation } = cartApi;
