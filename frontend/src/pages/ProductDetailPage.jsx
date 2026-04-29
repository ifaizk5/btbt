import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAPI } from '../api/index.js';
import { addItem } from '../redux/slices/cartSlice.js';
import { getProductImageAlt, getProductImageUrl } from '../utils/productImage.js';
import { selectWishlistItems, toggleWishlistItem } from '../redux/slices/wishlistSlice.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await productAPI.getById(id);
      setProduct(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addItem({
        product,
        quantity: parseInt(quantity, 10),
        variant: null,
      })
    );
    alert('Added to cart!');
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    dispatch(toggleWishlistItem(product));
  };

  if (isLoading) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center">
        <p className="premium-meta">Loading product</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center px-4">
        <div className="premium-card max-w-lg p-6 text-center md:p-8">
          <p className="premium-meta text-[#8f5c4e]">{error}</p>
          <button onClick={() => navigate('/')} className="premium-button premium-button--ghost mt-6 px-5 py-3">
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  return (
    <div className="premium-shell min-h-screen">
      <div className="premium-container py-8 lg:py-12">
        <button
          onClick={() => navigate('/')}
          className="premium-button premium-button--ghost mb-8 px-5 py-3"
        >
          Back to shop
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_0.95fr]">
          <div className="premium-card premium-card--image overflow-hidden">
            <div className="flex min-h-[34rem] items-center justify-center bg-[linear-gradient(180deg,#f3ede3_0%,#fbf8f3_100%)] p-6 md:p-10">
              <img
                src={getProductImageUrl(product)}
                alt={getProductImageAlt(product)}
                className="max-h-[30rem] w-full object-contain transition-transform duration-700 ease-in-out hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.src = '/coffee_mug.png';
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="premium-kicker">Product detail</div>
              <h1 className="premium-display mt-3 text-[clamp(3rem,6vw,5.5rem)]">{product.name}</h1>
            </div>

            <div className="premium-card p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-line)] pb-5">
                <div>
                  <div className="premium-meta">Price</div>
                  <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                    ₨ {product.price.toLocaleString()}
                  </p>
                </div>
                <p className="premium-meta text-right">
                  Stock {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              </div>

              <p className="premium-copy mt-5 text-[1rem] leading-8">{product.description}</p>

              {product.rating.count > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-line)] pt-5">
                  <div className="flex gap-1 text-sm">{'⭐'.repeat(Math.round(product.rating.average))}</div>
                  <span className="premium-meta">
                    {product.rating.average.toFixed(1)} / 5 from {product.rating.count} reviews
                  </span>
                </div>
              )}
            </div>

            <div className="premium-card p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-end">
                <div>
                  <label className="premium-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="premium-input"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="premium-button w-full px-5 py-3"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              <button
                onClick={handleToggleWishlist}
                className={`premium-button premium-button--ghost mt-4 w-full px-5 py-3 ${
                  isInWishlist ? 'border-[var(--color-text)]' : ''
                }`}
              >
                {isInWishlist ? '♥ Saved to wishlist' : '♡ Save to wishlist'}
              </button>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="premium-card p-6 md:p-8">
                <div className="premium-meta">Tags</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="premium-pill px-4 py-2 text-[0.68rem]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
