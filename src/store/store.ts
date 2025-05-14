import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice
  },
});

// Типизация Store
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;