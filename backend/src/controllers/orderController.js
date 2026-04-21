import orderService from '../services/orderService.js';

export const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.userId, req.validatedBody);

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: order,
      message: 'Order created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id, req.userId);

    res.json({
      success: true,
      statusCode: 200,
      data: order,
      message: 'Order retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await orderService.getUserOrders(
      req.userId,
      parseInt(page),
      parseInt(limit)
    );

    res.json({
      success: true,
      statusCode: 200,
      data: result,
      message: 'User orders retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, paymentStatus } = req.query;

    const filters = {
      status,
      paymentStatus,
    };

    const result = await orderService.getAllOrders(
      parseInt(page),
      parseInt(limit),
      filters
    );

    res.json({
      success: true,
      statusCode: 200,
      data: result,
      message: 'Orders retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);

    res.json({
      success: true,
      statusCode: 200,
      data: order,
      message: 'Order status updated',
    });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const order = await orderService.updatePaymentStatus(id, paymentStatus);

    res.json({
      success: true,
      statusCode: 200,
      data: order,
      message: 'Payment status updated',
    });
  } catch (error) {
    next(error);
  }
};
