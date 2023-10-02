import { configureStore } from '@reduxjs/toolkit';
import userDashboardSlice from './slices/userDashboardSlice';

export const store = configureStore({
  reducer: {
    userDashboard: userDashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
