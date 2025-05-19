import { createSlice } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  count: number;
};

export interface CartState {
  items: CartItem[];
};

// Начальное состояние
const initialState: CartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
}); 

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;