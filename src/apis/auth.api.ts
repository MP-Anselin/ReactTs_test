import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest } from "../dto/login-request.dto";
import { User } from "../models/User";
import {CreateUserRequest} from "../dto/create-user-request.dto";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/auth",
  }),
  endpoints: (build) => ({
    login: build.mutation<User, LoginRequest>({
      query: (loginRequest) => ({
        url: "/login",
        method: "POST",
        body: loginRequest,
        withCredentials: true,
      }),
    }),
    signup: build.mutation<User, CreateUserRequest>({
      query: (createUserRequest) => ({
        url: "/signup",
        method: "POST",
        body: createUserRequest,
        withCredentials: true,
      }),
    }),
    logOut: build.mutation<User, undefined>({
      query: () => ({
        url: "/logout",
        method: "POST",
        withCredentials: true,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
