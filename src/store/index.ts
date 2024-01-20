import { configureStore } from "@reduxjs/toolkit";
import placeSlice from "./placeSlice";

export const store = configureStore({
  reducer: {
    place: placeSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;