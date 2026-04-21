import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { validate, orderValidation } from '../utils/validation.js';
import { authenticate, authorize } from '../middlewares/index.js';

const router = express.Router();

router.use(authenticate);

// User routes
router.post('/', validate(orderValidation.create), orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrder);

// Admin routes
router.get(
  '/admin/list',
  authorize('admin'),
  orderController.listOrders
);

router.put(
  '/:id/status',
  authorize('admin'),
  orderController.updateOrderStatus
);

router.put(
  '/:id/payment-status',
  authorize('admin'),
  orderController.updatePaymentStatus
);

export default router;
