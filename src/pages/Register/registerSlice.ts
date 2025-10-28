import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../global/redux/store';

interface RegisterState {
  loading: boolean;
  errorRegister: string | null;
  successRegister: boolean;
}

const initialState: RegisterState = {
  loading: false,
  errorRegister: null,
  successRegister: false,
};

export const postRegisterUser = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('register/postRegisterUser', async (email: string, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const stored = localStorage.getItem('userList');
    if (!stored) {
      localStorage.setItem('userList', JSON.stringify([]));
    } else {
      try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
          localStorage.setItem('userList', JSON.stringify([]));
        }
      } catch {
        localStorage.setItem('userList', JSON.stringify([]));
      }
    }

    const currentList = JSON.parse(
      localStorage.getItem('userList') as string,
    ) as string[];

    if (currentList.includes(email)) {
      return rejectWithValue('exist');
    }

    currentList.push(email);
    localStorage.setItem('userList', JSON.stringify(currentList));

    return true;
  } catch {
    return rejectWithValue('Failed to check or register user');
  }
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.errorRegister = null;
      state.successRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state) => {
        state.loading = true;
        state.errorRegister = null;
      })
      .addCase(postRegisterUser.fulfilled, (state) => {
        state.loading = false;
        state.successRegister = true;
      })
      .addCase(postRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.errorRegister = action.payload as string;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;

export const selectRegisterState = (state: RootState) => state.register;

export default registerSlice.reducer;
