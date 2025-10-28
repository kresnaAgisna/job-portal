import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../global/redux/store';
import { safeParseLocalStorage } from '../../global/helpers/safeParseStorage';

interface LoginState {
  loading: boolean;
  errorLogin: string | null;
  successLogin: boolean;
  userData: string | null;
}

const initialState: LoginState = {
  loading: false,
  errorLogin: null,
  successLogin: false,
  userData: null,
};

export const postLoginUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('login/postLoginUser', async (email, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userList = safeParseLocalStorage<string[]>('userList', []);

    if (!Array.isArray(userList)) {
      throw new Error('User list tidak valid');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userFound = userList.find(
      (u) => typeof u === 'string' && u.toLowerCase() === normalizedEmail,
    );

    if (!userFound) {
      throw new Error('Akun tidak ditemukan');
    }

    localStorage.setItem('userData', JSON.stringify(normalizedEmail));

    return normalizedEmail;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Terjadi kesalahan saat login';
    return rejectWithValue(message);
  }
});

export const handleLogout = createAsyncThunk(
  'login/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('userData');

    dispatch(resetLoginState());
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.errorLogin = null;
      state.successLogin = false;
      state.userData = null;
    },
    setUserData: (state, action: PayloadAction<string | null>) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLoginUser.pending, (state) => {
        state.loading = true;
        state.errorLogin = null;
      })
      .addCase(postLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successLogin = true;
        state.userData = action.payload;
      })
      .addCase(postLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload as string;
        state.userData = null;
      });
  },
});

export const { resetLoginState, setUserData } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login;

export default loginSlice.reducer;
