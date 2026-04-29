import Joi from 'joi';

// Custom validation messages
const messages = {
  'string.email': 'Please enter a valid email address',
  'string.min': 'Must be at least {#limit} characters',
  'string.max': 'Must not exceed {#limit} characters',
  'number.min': 'Minimum value is {#limit}',
  'number.max': 'Maximum value is {#limit}',
  'any.required': '{#label} is required',
};

// Validation schemas
export const authValidation = {
  register: Joi.object({
    email: Joi.string().email().required().messages(messages),
    password: Joi.string().min(8).required().messages(messages),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages(messages),
    password: Joi.string().required().messages(messages),
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

export const productValidation = {
  create: Joi.object({
    name: Joi.string().min(3).max(200).required().messages(messages),
    description: Joi.string().min(10).max(5000).required(),
    price: Joi.number().positive().required().messages(messages),
    cost: Joi.number().positive(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().required(),
    imageAlt: Joi.string().allow(''),
    stock: Joi.number().integer().min(0).required().messages(messages),
    variants: Joi.array().items(
      Joi.object({
        type: Joi.string(),
        options: Joi.array().items(Joi.string()),
      })
    ),
  }),

  update: Joi.object({
    name: Joi.string().min(3).max(200),
    description: Joi.string().min(10).max(5000),
    price: Joi.number().positive(),
    cost: Joi.number().positive(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    imageUrl: Joi.string(),
    imageAlt: Joi.string().allow(''),
    stock: Joi.number().integer().min(0),
    variants: Joi.array().items(
      Joi.object({
        type: Joi.string(),
        options: Joi.array().items(Joi.string()),
      })
    ),
  }),
};

export const orderValidation = {
  create: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
          variant: Joi.object(),
        })
      )
      .required(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    paymentMethod: Joi.string().valid('card', 'transfer').required(),
  }),
};

export const couponValidation = {
  create: Joi.object({
    code: Joi.string().uppercase().required(),
    type: Joi.string().valid('percentage', 'fixed').required(),
    value: Joi.number().positive().required(),
    minAmount: Joi.number().positive(),
    maxUses: Joi.number().integer().positive(),
    expiresAt: Joi.date().required(),
  }),
};

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: {
          code: 'VALIDATION_ERROR',
          details,
        },
        message: 'Validation failed',
      });
    }

    req.validatedBody = value;
    next();
  };
};
