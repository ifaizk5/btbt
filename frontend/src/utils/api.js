// Backend utility helpers
export const formatErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred';
};

export const getErrorDetails = (error) => {
  return error.response?.data?.error?.details || {};
};

export const isAxiosError = (error) => {
  return error.response !== undefined;
};

// API response handler
export const handleApiResponse = (response) => {
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

// Pagination helper
export const getPaginationPages = (totalPages) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};
