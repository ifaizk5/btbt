import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import cartReducer from './slices/cartSlice.js';
import productReducer from './slices/productSlice.js';
import wishlistReducer, { persistWishlistState } from './slices/wishlistSlice.js';
import { persistCartState } from './slices/cartSlice.js';
import { readStorage, writeStorage } from '../utils/storage.js';

const CART_STORAGE_KEY = 'btbt:cart';
const WISHLIST_STORAGE_KEY = 'btbt:wishlist';
const ACTIVE_USER_KEY = 'btbt:activeUser';

export const store = configureStore({
  preloadedState: {
    cart: {
      items: readStorage(CART_STORAGE_KEY, []),
      isLoading: false,
      error: null,
    },
    wishlist: {
      items: readStorage(WISHLIST_STORAGE_KEY, []),
    },
    auth: {
      user: readStorage(ACTIVE_USER_KEY, null),
      accessToken: readStorage('accessToken', null),
      refreshToken: readStorage('refreshToken', null),
      isLoading: false,
      error: null,
    },
  },
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  persistCartState(state.cart.items);
  persistWishlistState(state.wishlist.items);
  writeStorage(ACTIVE_USER_KEY, state.auth.user);
});

export default store;
