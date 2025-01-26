import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategories } from '../types';

interface CategoriesState {
  value: ICategories[] | undefined;
}

const initialState = { value: [] } satisfies CategoriesState as CategoriesState;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getAllCategories(state, action: PayloadAction<ICategories[] | undefined>) {
      state.value = action.payload;
    },
  },
});

export const { getAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
