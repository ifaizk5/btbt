import { Wishlist } from '../models/Wishlist.js';
import { Product } from '../models/Product.js';
import { NotFoundError } from '../utils/errors.js';

class WishlistService {
  async getWishlist(userId) {
    let wishlist = await Wishlist.findOne({ user: userId }).populate(
      'products.product'
    );

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    return wishlist;
  }

  async addToWishlist(userId, productId) {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Product');
    }

    // Check if already in wishlist
    if (
      !wishlist.products.some(
        (item) => item.product.toString() === productId
      )
    ) {
      wishlist.products.push({ product: productId });
    }

    await wishlist.save();
    return wishlist.populate('products.product');
  }

  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      throw new NotFoundError('Wishlist');
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    return wishlist.populate('products.product');
  }

  async clearWishlist(userId) {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { products: [] },
      { new: true }
    );

    if (!wishlist) {
      throw new NotFoundError('Wishlist');
    }

    return wishlist;
  }
}

export default new WishlistService();
