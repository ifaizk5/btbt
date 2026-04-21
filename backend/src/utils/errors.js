// Custom API Error class
export class ApiError extends Error {
  constructor(statusCode, message, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation Error
export class ValidationError extends ApiError {
  constructor(message, details = {}) {
    super(400, message, 'VALIDATION_ERROR');
    this.details = details;
  }
}

// Authentication Error
export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed') {
    super(401, message, 'AUTHENTICATION_ERROR');
  }
}

// Authorization Error
export class AuthorizationError extends ApiError {
  constructor(message = 'Access denied') {
    super(403, message, 'AUTHORIZATION_ERROR');
  }
}

// Not Found Error
export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
}

// Conflict Error
export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists') {
    super(409, message, 'CONFLICT');
  }
}

// Server Error
export class ServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(500, message, 'INTERNAL_ERROR');
  }
}
