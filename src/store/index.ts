import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slice/search.slice";
import animalReducer from "./slice/animal.slice";

export const store = configureStore({
  reducer: {
    searchReducer,
    animalReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
