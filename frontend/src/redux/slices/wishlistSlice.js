import { createSlice } from '@reduxjs/toolkit';
import { readStorage, writeStorage } from '../../utils/storage.js';

const WISHLIST_STORAGE_KEY = 'btbt:wishlist';

const initialState = {
  items: readStorage(WISHLIST_STORAGE_KEY, []),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    hydrateWishlist: (state, action) => {
      state.items = action.payload || [];
    },
    addWishlistItem: (state, action) => {
      const exists = state.items.some((item) => item._id === action.payload._id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload.productId);
    },
    toggleWishlistItem: (state, action) => {
      const exists = state.items.some((item) => item._id === action.payload._id);

      if (exists) {
        state.items = state.items.filter((item) => item._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  hydrateWishlist,
  addWishlistItem,
  removeWishlistItem,
  toggleWishlistItem,
  clearWishlist,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;

export const persistWishlistState = (items) => {
  writeStorage(WISHLIST_STORAGE_KEY, items);
};

export default wishlistSlice.reducer;
