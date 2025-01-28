import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../types';

interface CategoriesState {
  value: ICategories[] | null;
  oneCategory: ICategories | null;
}

const initialState = { value: [], oneCategory: null } satisfies CategoriesState as CategoriesState;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getAllCategories(state, action: PayloadAction<ICategories[] | null>) {
      state.value = action.payload;
    },
    getOneCategorie(state, action: PayloadAction<ICategories | null>) {
      state.oneCategory = action.payload;
    },
  },
});

export const { getAllCategories, getOneCategorie } = categoriesSlice.actions;
export default categoriesSlice.reducer;
