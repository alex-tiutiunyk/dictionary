import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface WordsState {
  value: number;
}

const initialState = { value: 0 } satisfies WordsState as WordsState;

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    getAllWords(state) {
      state.value++;
    },
    getSingleWord(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    createWord(state) {
      state.value--;
    },
    deleteWord(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { getAllWords, getSingleWord, createWord, deleteWord } = wordSlice.actions;
export default wordSlice.reducer;
