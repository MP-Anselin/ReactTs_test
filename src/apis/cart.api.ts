import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartManagementRequest } from "../dto/cart-management-request.dto";

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
  }),
});

export const { useAddProductInCartMutation, useDeleteProductInCartMutation } = cartApi;
