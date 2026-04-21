// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  'clothing',
  'accessories',
  'footwear',
  'art',
  'electronics',
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Currency
export const CURRENCY = {
  SYMBOL: '₨',
  CODE: 'PKR',
  DECIMAL_PLACES: 0,
};

// Tax Rate
export const TAX_RATE = 0.17; // 17%

// Shipping Cost
export const SHIPPING_COST = 200;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Coupon Types
export const COUPON_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
};
