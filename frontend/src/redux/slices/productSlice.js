import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    total: 0,
    pages: 0,
    current: 1,
    limit: 20,
  },
  categories: [],
  tags: [],
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    tags: [],
    search: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products || [];
      state.pagination = action.payload.pagination || initialState.pagination;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setCategories,
  setTags,
  setFilters,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;
export default productSlice.reducer;
