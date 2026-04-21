import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDatabase from './config/database.js';
import config from './config/config.js';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from './middlewares/index.js';
import logger from './utils/logger.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

const app = express();

// Database Connection
await connectDatabase();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (config.corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(
    `Server running in ${config.nodeEnv} mode on port ${PORT}`
  );
  console.log(
    `✅ Server running at http://localhost:${PORT}/api/v1/health`
  );
});

export default app;
