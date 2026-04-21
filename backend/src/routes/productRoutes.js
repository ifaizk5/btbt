import express from 'express';
import * as productController from '../controllers/productController.js';
import { validate, productValidation } from '../utils/validation.js';
import { authenticate, authorize } from '../middlewares/index.js';

const router = express.Router();

// Public routes
router.get('/', productController.listProducts);
router.get('/search', productController.searchProducts);
router.get('/categories', productController.getCategories);
router.get('/tags', productController.getTags);
router.get('/:id', productController.getProduct);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(productValidation.create),
  productController.createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(productValidation.update),
  productController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  productController.deleteProduct
);

export default router;
