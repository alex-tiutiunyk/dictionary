import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import wordsSlice from './wordSlice';
import categoriesSlice from './categoriesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    words: wordsSlice,
    categories: categoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
