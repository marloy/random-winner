import { configureStore } from "@reduxjs/toolkit";
import wheelReducer from "../slices/wheelSlice";

export const store = configureStore({
  reducer: {
    wheel: wheelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
