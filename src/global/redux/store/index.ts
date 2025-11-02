import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import registerSlice from '../../../pages/Register/registerSlice';
import loginSlice from '../../../pages/Login/loginSlice';
import jobPostingSlice from '../../../pages/JobPosting/jobPostingSlice';
import jobListSlice from '../../../pages/JobList/jobListSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    jobPosting: jobPostingSlice,
    jobList: jobListSlice,
  },
});

// 🔹 Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
