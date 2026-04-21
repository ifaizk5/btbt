import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { NotFoundError } from '../utils/errors.js';

class CartService {
  async getCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate(
      'items.product coupon'
    );

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    return cart;
  }

  async addToCart(userId, productId, quantity = 1, variant = null) {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Product');
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.variant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        variant,
      });
    }

    await cart.save();
    return cart.populate('items.product');
  }

  async removeFromCart(userId, productId, variant = null) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundError('Cart');
    }

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId && item.variant === variant
        )
    );

    await cart.save();
    return cart.populate('items.product');
  }

  async updateCartItem(userId, productId, quantity, variant = null) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundError('Cart');
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.variant === variant
    );

    if (!item) {
      throw new NotFoundError('Cart item');
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) =>
          !(
            item.product.toString() === productId &&
            item.variant === variant
          )
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    return cart.populate('items.product');
  }

  async clearCart(userId) {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      throw new NotFoundError('Cart');
    }

    return cart;
  }

  async calculateCartTotal(userId) {
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product coupon'
    );

    if (!cart || cart.items.length === 0) {
      return {
        subtotal: 0,
        taxAmount: 0,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: 0,
      };
    }

    let subtotal = 0;
    cart.items.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });

    const taxAmount = Math.round(subtotal * 0.17);
    const shippingCost = 200;
    let discountAmount = 0;

    if (cart.coupon) {
      if (cart.coupon.type === 'percentage') {
        discountAmount = Math.round(subtotal * (cart.coupon.value / 100));
      } else {
        discountAmount = cart.coupon.value;
      }
      if (cart.coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, cart.coupon.maxDiscount);
      }
    }

    const totalAmount = subtotal + taxAmount + shippingCost - discountAmount;

    return {
      subtotal,
      taxAmount,
      shippingCost,
      discountAmount,
      totalAmount,
    };
  }
}

export default new CartService();
