import { configureStore } from '@reduxjs/toolkit';
import searcSlice from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searcSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
