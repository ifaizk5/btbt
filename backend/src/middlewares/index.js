import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

// Authentication Middleware
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        error: {
          code: 'AUTHENTICATION_ERROR',
          details: error.message,
        },
        message: 'Authentication failed',
      });
    }

    res.status(401).json({
      success: false,
      statusCode: 401,
      error: {
        code: 'INVALID_TOKEN',
        details: error.message,
      },
      message: 'Invalid or expired token',
    });
  }
};

// Role-based Authorization Middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        error: { code: 'AUTHENTICATION_ERROR' },
        message: 'Not authenticated',
      });
    }

    if (!roles.includes(req.userRole)) {
      logger.warn(`Unauthorized access attempt by user ${req.userId}`);
      return res.status(403).json({
        success: false,
        statusCode: 403,
        error: { code: 'AUTHORIZATION_ERROR' },
        message: `Access denied. Required roles: ${roles.join(', ')}`,
      });
    }

    next();
  };
};

// Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    status: err.statusCode || 500,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const code = err.code || 'INTERNAL_ERROR';

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      code,
      details: err.details || null,
    },
    message,
  });
};

// 404 Middleware
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    error: {
      code: 'NOT_FOUND',
      details: `Route ${req.originalUrl} not found`,
    },
    message: 'Resource not found',
  });
};

// Request Logging Middleware
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
