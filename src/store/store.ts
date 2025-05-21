import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import { CART_PERSISTENT_STATE, cartSlice } from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  },
});

store.subscribe(() => {
  saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
  saveState(store.getState().cart, CART_PERSISTENT_STATE);
})

// Типизация Store
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;