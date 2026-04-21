// Format price to PKR currency
export const formatPrice = (price) => {
  return `₨ ${price.toLocaleString('en-PK')}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date and time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Truncate text
export const truncate = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-nb-yellow text-nb-black',
    paid: 'bg-nb-lime text-nb-black',
    shipped: 'bg-nb-blue text-nb-white',
    delivered: 'bg-nb-lime text-nb-black',
    cancelled: 'bg-nb-red text-nb-white',
    completed: 'bg-nb-lime text-nb-black',
    failed: 'bg-nb-red text-nb-white',
  };
  return colors[status] || 'bg-nb-gray text-nb-black';
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Local Storage helpers
export const storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

// Validation helpers
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
};
