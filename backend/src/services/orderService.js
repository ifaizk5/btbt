import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { NotFoundError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class OrderService {
  async createOrder(userId, orderData) {
    const { items, shippingAddress, paymentMethod } = orderData;

    // Calculate totals
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new NotFoundError('Product');
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
        variant: item.variant || null,
      });
    }

    const taxAmount = Math.round(subtotal * 0.17); // 17% tax
    const shippingCost = 200; // Fixed shipping
    const totalAmount = subtotal + taxAmount + shippingCost;

    const order = new Order({
      user: userId,
      items: processedItems,
      subtotal,
      taxAmount,
      shippingCost,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
    });

    await order.save();

    // Clear user's cart
    await Cart.findOneAndDelete({ user: userId });

    logger.info(`Order created: ${order._id}`);
    return order.populate('user items.product');
  }

  async getOrderById(orderId, userId) {
    const order = await Order.findById(orderId).populate(
      'user items.product coupon'
    );

    if (!order) {
      throw new NotFoundError('Order');
    }

    // Ensure user can only access their orders (unless admin)
    if (order.user._id.toString() !== userId && !isAdmin) {
      throw new AuthorizationError('Cannot access this order');
    }

    return order;
  }

  async getUserOrders(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.product coupon');

    const total = await Order.countDocuments({ user: userId });

    return {
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  }

  async getAllOrders(page = 1, limit = 20, filters = {}) {
    const skip = (page - 1) * limit;
    const query = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.paymentStatus) {
      query.paymentStatus = filters.paymentStatus;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user items.product');

    const total = await Order.countDocuments(query);

    return {
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  }

  async updateOrderStatus(orderId, status) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      throw new NotFoundError('Order');
    }

    logger.info(`Order status updated: ${orderId} -> ${status}`);
    return order;
  }

  async updatePaymentStatus(orderId, paymentStatus) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus, status: paymentStatus === 'completed' ? 'paid' : 'pending' },
      { new: true }
    );

    if (!order) {
      throw new NotFoundError('Order');
    }

    logger.info(`Order payment updated: ${orderId} -> ${paymentStatus}`);
    return order;
  }
}

export default new OrderService();
