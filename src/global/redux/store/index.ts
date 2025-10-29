import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import registerSlice from '../../../pages/Register/registerSlice';
import loginSlice from '../../../pages/Login/loginSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
  },
});

// 🔹 Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
