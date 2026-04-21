import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { authenticate } from '../middlewares/index.js';

const router = express.Router();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:productId', cartController.removeFromCart);
router.put('/:productId', cartController.updateCartItem);
router.delete('/', cartController.clearCart);
router.get('/total', cartController.getCartTotal);

export default router;
