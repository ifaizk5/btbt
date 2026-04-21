import wishlistService from '../services/wishlistService.js';

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: wishlist,
      message: 'Wishlist retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const wishlist = await wishlistService.addToWishlist(
      req.userId,
      productId
    );

    res.json({
      success: true,
      statusCode: 200,
      data: wishlist,
      message: 'Product added to wishlist',
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const wishlist = await wishlistService.removeFromWishlist(
      req.userId,
      productId
    );

    res.json({
      success: true,
      statusCode: 200,
      data: wishlist,
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    next(error);
  }
};

export const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistService.clearWishlist(req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: wishlist,
      message: 'Wishlist cleared',
    });
  } catch (error) {
    next(error);
  }
};
