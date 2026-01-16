import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
