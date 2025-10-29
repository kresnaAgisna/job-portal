import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import registerSlice from '../../../pages/Register/registerSlice';
import loginSlice from '../../../pages/Login/loginSlice';
import jobPostingSlice from '../../../pages/JobPosting/jobPostingSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    jobPosting: jobPostingSlice,
  },
});

// 🔹 Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
