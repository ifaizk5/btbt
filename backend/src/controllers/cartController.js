import cartService from '../services/cartService.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: cart,
      message: 'Cart retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, variant } = req.body;
    const cart = await cartService.addToCart(
      req.userId,
      productId,
      quantity,
      variant
    );

    res.json({
      success: true,
      statusCode: 200,
      data: cart,
      message: 'Item added to cart',
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { variant } = req.query;

    const cart = await cartService.removeFromCart(
      req.userId,
      productId,
      variant
    );

    res.json({
      success: true,
      statusCode: 200,
      data: cart,
      message: 'Item removed from cart',
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity, variant } = req.body;

    const cart = await cartService.updateCartItem(
      req.userId,
      productId,
      quantity,
      variant
    );

    res.json({
      success: true,
      statusCode: 200,
      data: cart,
      message: 'Cart item updated',
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await cartService.clearCart(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: cart,
      message: 'Cart cleared',
    });
  } catch (error) {
    next(error);
  }
};

export const getCartTotal = async (req, res, next) => {
  try {
    const totals = await cartService.calculateCartTotal(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: totals,
      message: 'Cart total calculated',
    });
  } catch (error) {
    next(error);
  }
};
