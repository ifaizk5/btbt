import express from 'express';
import * as authController from '../controllers/authController.js';
import { validate, authValidation } from '../utils/validation.js';
import { authenticate } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post(
  '/refresh',
  validate(authValidation.refreshToken),
  authController.refreshToken
);
router.post('/logout', authenticate, authController.logout);

export default router;
