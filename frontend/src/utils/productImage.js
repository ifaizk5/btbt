import { resolveMediaUrl } from './media.js';

export const getProductImageUrl = (product) => {
  if (!product) return '/coffee_mug.png';

  const imageUrl = product.imageUrl || product.images?.[0]?.url;
  return resolveMediaUrl(imageUrl);
};

export const getProductImageAlt = (product) => product?.imageAlt || product?.images?.[0]?.alt || product?.name || 'Product image';
