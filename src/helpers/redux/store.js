import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
