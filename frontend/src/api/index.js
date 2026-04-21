import apiClient from './client.js';

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (data) => apiClient.post('/auth/refresh', data),
};

// Product APIs
export const productAPI = {
  getAll: (params) => apiClient.get('/products', { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  search: (query, params) => apiClient.get('/products/search', { params: { q: query, ...params } }),
  getCategories: () => apiClient.get('/products/categories'),
  getTags: () => apiClient.get('/products/tags'),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  get: () => apiClient.get('/cart'),
  add: (data) => apiClient.post('/cart', data),
  remove: (productId, variant) => apiClient.delete(`/cart/${productId}`, { params: { variant } }),
  update: (productId, data) => apiClient.put(`/cart/${productId}`, data),
  clear: () => apiClient.delete('/cart'),
  getTotal: () => apiClient.get('/cart/total'),
};

// Order APIs
export const orderAPI = {
  create: (data) => apiClient.post('/orders', data),
  getById: (id) => apiClient.get(`/orders/${id}`),
  getAll: (params) => apiClient.get('/orders', { params }),
  list: (params) => apiClient.get('/orders/admin/list', { params }),
  updateStatus: (id, data) => apiClient.put(`/orders/${id}/status`, data),
  updatePaymentStatus: (id, data) => apiClient.put(`/orders/${id}/payment-status`, data),
};

// Wishlist APIs
export const wishlistAPI = {
  get: () => apiClient.get('/wishlist'),
  add: (data) => apiClient.post('/wishlist', data),
  remove: (productId) => apiClient.delete(`/wishlist/${productId}`),
  clear: () => apiClient.delete('/wishlist'),
};
