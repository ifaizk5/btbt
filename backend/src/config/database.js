import mongoose from 'mongoose';
import config from './config.js';
import logger from '../utils/logger.js';

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      config.mongodb.uri,
      config.mongodb.options
    );

    logger.info(
      `MongoDB connected: ${connection.connection.host}:${connection.connection.port}`
    );
    return connection;
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
