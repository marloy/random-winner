import { configureStore } from "@reduxjs/toolkit";
import wheelReducer from "../slices/wheelSlice";

export const store = configureStore({
  reducer: {
    wheel: wheelReducer, // обязательно имя "wheel" соответствует ключу в state
  },
});

// Типы для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
