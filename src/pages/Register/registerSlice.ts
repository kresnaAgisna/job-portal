import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  value: number;
}

const initialState: RegisterState = {
  value: 0,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  registerSlice.actions;

export default registerSlice.reducer;
