const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default {
  apiBaseUrl: API_BASE_URL,
  apiV1Url: `${API_BASE_URL}/v1`,
};
