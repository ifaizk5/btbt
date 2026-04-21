import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { User } from '../models/User.js';
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from '../utils/errors.js';
import logger from '../utils/logger.js';

class AuthService {
  async register(email, password, firstName, lastName) {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();
    logger.info(`User registered: ${email}`);

    return this.createSessionTokens(user);
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is inactive');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${email}`);
    return this.createSessionTokens(user);
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
      const user = await User.findById(decoded.userId);

      if (!user) {
        throw new NotFoundError('User');
      }

      // Check if refresh token is valid
      const tokenRecord = user.refreshTokens.find(
        (t) => t.token === refreshToken && t.expiresAt > new Date()
      );

      if (!tokenRecord) {
        throw new AuthenticationError('Invalid refresh token');
      }

      const tokens = this.generateTokens(user._id, user.role);
      const decodedNewRefresh = jwt.decode(tokens.refreshToken);

      user.refreshTokens = user.refreshTokens.filter(
        (t) => t.token !== refreshToken && t.expiresAt > new Date()
      );

      user.refreshTokens.push({
        token: tokens.refreshToken,
        expiresAt: new Date(decodedNewRefresh.exp * 1000),
      });

      if (user.refreshTokens.length > 5) {
        user.refreshTokens = user.refreshTokens
          .sort((a, b) => b.expiresAt - a.expiresAt)
          .slice(0, 5);
      }

      await user.save();
      return tokens;
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError('Invalid refresh token');
    }
  }

  async createSessionTokens(user) {
    const tokens = this.generateTokens(user._id, user.role);
    const decodedRefresh = jwt.decode(tokens.refreshToken);

    user.refreshTokens = user.refreshTokens.filter((t) => t.expiresAt > new Date());
    user.refreshTokens.push({
      token: tokens.refreshToken,
      expiresAt: new Date(decodedRefresh.exp * 1000),
    });

    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens
        .sort((a, b) => b.expiresAt - a.expiresAt)
        .slice(0, 5);
    }

    await user.save();
    return tokens;
  }

  generateTokens(userId, role) {
    const accessToken = jwt.sign(
      { userId, role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      { userId, role },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.expiresIn,
    };
  }

  async logout(userId) {
    await User.findByIdAndUpdate(userId, { refreshTokens: [] });
    logger.info(`User logged out: ${userId}`);
  }
}

export default new AuthService();
