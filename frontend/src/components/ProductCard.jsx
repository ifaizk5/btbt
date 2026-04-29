import React from 'react';
import { Link } from 'react-router-dom';
import { getProductImageAlt, getProductImageUrl } from '../utils/productImage.js';

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  className = '',
}) {
  const imageUrl = getProductImageUrl(product);
  const imageAlt = getProductImageAlt(product);

  return (
    <article className={`premium-card overflow-hidden ${className}`}>
      <Link to={`/product/${product._id}`} className="group flex h-full flex-col">
        <div className="relative flex min-h-[18rem] items-center justify-center overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-8 md:min-h-[22rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,155,115,0.12),transparent_40%)] opacity-80" />
          <img
            src={imageUrl}
            alt={imageAlt}
            className="relative z-10 max-h-[22rem] w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.src = '/coffee_mug.png';
            }}
          />
          <button
            type="button"
            aria-pressed={isWishlisted}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[rgba(255,253,250,0.92)] text-lg text-[var(--color-text)] transition-transform hover:scale-105 ${
              isWishlisted ? 'text-[#8f5c4e]' : ''
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5 p-5 md:p-6">
          <div>
            <div className="premium-meta">{product.category}</div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              {product.name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{product.description}</p>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-[var(--color-line)] pt-4">
            <div>
              <div className="premium-meta">PKR</div>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                {product.price.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="premium-button premium-button--ghost px-4 py-2 text-[0.7rem]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
