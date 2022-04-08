import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { usersApi } from "../apis/users.api";
import auth from "../slices/auth.slice";
import { cartApi } from "../apis/cart.api";
import { productApi } from "../apis/product.api";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
