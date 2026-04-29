import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    cost: Number,
    category: {
      type: String,
      required: true,
      index: true,
    },
    tags: [String],
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: String,
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
      },
    ],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Full-text search index
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const Product = mongoose.model('Product', productSchema);
