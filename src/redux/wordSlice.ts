import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../types';

interface WordsState {
  value: IWord[] | undefined;
}

const initialState = { value: [] } satisfies WordsState as WordsState;

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    getAllWords(state, action: PayloadAction<IWord[] | undefined>) {
      state.value = action.payload;
    },
  },
});

export const { getAllWords } = wordSlice.actions;
export default wordSlice.reducer;
