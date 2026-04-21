import authService from '../services/authService.js';
import logger from '../utils/logger.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.validatedBody;

    const tokens = await authService.register(
      email,
      password,
      firstName,
      lastName
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: tokens,
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;
    const tokens = await authService.login(email, password);

    res.json({
      success: true,
      statusCode: 200,
      data: tokens,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.validatedBody;
    const tokens = await authService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      statusCode: 200,
      data: tokens,
      message: 'Token refreshed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: null,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
