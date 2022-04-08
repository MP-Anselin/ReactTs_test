import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/User";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/products",
  }),
  endpoints: (build) => ({
    getProducts: build.mutation<User, undefined>({
      query: () => ({
        url: "/",
        method: "GET",
        withCredentials: true,
      }),
    }),
  }),
});

export const { useGetProductsMutation } = productsApi;
