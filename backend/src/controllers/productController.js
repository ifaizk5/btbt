import productService from '../services/productService.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(
      req.validatedBody,
      req.userId
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.validatedBody);

    res.json({
      success: true,
      statusCode: 200,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.json({
      success: true,
      statusCode: 200,
      data: null,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    res.json({
      success: true,
      statusCode: 200,
      data: product,
      message: 'Product retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, minPrice, maxPrice, tags, sort } =
      req.query;

    const filters = {
      category,
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
      tags: tags ? tags.split(',') : null,
    };

    const result = await productService.getAllProducts(
      parseInt(page),
      parseInt(limit),
      filters,
      sort || 'createdAt'
    );

    res.json({
      success: true,
      statusCode: 200,
      data: result,
      message: 'Products retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        error: { code: 'VALIDATION_ERROR' },
        message: 'Search query is required',
      });
    }

    const result = await productService.searchProducts(q, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      statusCode: 200,
      data: result,
      message: 'Search results retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();

    res.json({
      success: true,
      statusCode: 200,
      data: { categories },
      message: 'Categories retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await productService.getTags();

    res.json({
      success: true,
      statusCode: 200,
      data: { tags },
      message: 'Tags retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
