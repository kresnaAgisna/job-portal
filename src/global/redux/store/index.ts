import { configureStore } from '@reduxjs/toolkit';
import registerSlice from '../../../pages/Register/registerSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
  },
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
