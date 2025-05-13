import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

// Типизация Store
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;