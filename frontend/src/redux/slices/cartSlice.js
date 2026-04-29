import { createSlice } from '@reduxjs/toolkit';
import { readStorage, writeStorage } from '../../utils/storage.js';

const CART_STORAGE_KEY = 'btbt:cart';

const initialState = {
  items: readStorage(CART_STORAGE_KEY, []),
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || [];
    },
    addItem: (state, action) => {
      const exists = state.items.find(
        (item) =>
          item.product._id === action.payload.product._id &&
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      );

      if (exists) {
        exists.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === action.payload.productId &&
            JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
          )
      );
    },
    updateItem: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.product._id === action.payload.productId &&
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const persistCartState = (items) => {
  writeStorage(CART_STORAGE_KEY, items);
};

export const { setCart, addItem, removeItem, updateItem, clearCart, setLoading, setError } =
  cartSlice.actions;
export default cartSlice.reducer;
