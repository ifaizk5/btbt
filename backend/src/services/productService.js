import { Product } from '../models/Product.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class ProductService {
  async createProduct(productData, userId) {
    const product = new Product({
      ...productData,
      createdBy: userId,
    });

    await product.save();
    logger.info(`Product created: ${product._id}`);
    return product;
  }

  async updateProduct(productId, updateData) {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'firstName lastName email');

    if (!product) {
      throw new NotFoundError('Product');
    }

    logger.info(`Product updated: ${productId}`);
    return product;
  }

  async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new NotFoundError('Product');
    }

    logger.info(`Product deleted: ${productId}`);
    return product;
  }

  async getProductById(productId) {
    const product = await Product.findById(productId).populate(
      'createdBy',
      'firstName lastName'
    );

    if (!product) {
      throw new NotFoundError('Product');
    }

    return product;
  }

  async getAllProducts(
    page = 1,
    limit = 20,
    filters = {},
    sortBy = 'createdAt'
  ) {
    const skip = (page - 1) * limit;

    // Build filter query
    const query = { isActive: true };

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    if (filters.tags) {
      query.tags = { $in: filters.tags };
    }

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const products = await Product.find(query)
      .sort(sortBy === 'price' ? { price: 1 } : { [sortBy]: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(query);

    return {
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  }

  async searchProducts(searchQuery, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const products = await Product.find(
      { $text: { $search: searchQuery }, isActive: true },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments({
      $text: { $search: searchQuery },
      isActive: true,
    });

    return {
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  }

  async getCategories() {
    return Product.distinct('category', { isActive: true });
  }

  async getTags() {
    const products = await Product.find({ isActive: true })
      .select('tags')
      .lean();

    const tags = [...new Set(products.flatMap((p) => p.tags || []))];
    return tags;
  }
}

export default new ProductService();
