import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['http://localhost:5173', 'http://localhost:5174']
  ).filter(Boolean),

  // Database Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRE || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  },

  // Local Media Storage Configuration
  storage: {
    driver: process.env.STORAGE_DRIVER || 'local',
    uploadDir: process.env.LOCAL_UPLOAD_DIR || 'backend/public/uploads',
    mediaBaseUrl: process.env.MEDIA_BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  },

  // Store Configuration
  store: {
    name: process.env.STORE_NAME || 'My eCommerce Store',
    currency: process.env.STORE_CURRENCY || 'PKR',
    timezone: process.env.STORE_TIMEZONE || 'Asia/Karachi',
  },

  // Security & Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Requests per windowMs
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
  },
};

// Validate required environment variables in production
if (config.nodeEnv === 'production') {
  const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'STORAGE_DRIVER',
    'LOCAL_UPLOAD_DIR',
  ];

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}

export default config;
