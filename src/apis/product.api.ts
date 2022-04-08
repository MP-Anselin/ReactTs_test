import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../models/Product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/products",
  }),
  endpoints: (build) => ({
    getProducts: build.query<Array<Product>, undefined>({
      query: () => ({
        url: "/",
        method: "GET",
        withCredentials: true,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
