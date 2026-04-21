import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productAPI, wishlistAPI } from '../api/index.js';
import { addItem } from '../redux/slices/cartSlice.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
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
    if (product) {
      dispatch(addItem({
        product,
        quantity: parseInt(quantity),
        variant: null,
      }));
      alert('Added to cart!');
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist) {
        await wishlistAPI.remove(id);
        setIsInWishlist(false);
      } else {
        await wishlistAPI.add({ productId: id });
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error('Failed to toggle wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <p className="text-nb-lg font-bold uppercase">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <div className="card-nb text-center">
          <p className="text-nb-lg font-bold uppercase text-nb-red mb-6">{error}</p>
          <button onClick={() => navigate('/')} className="btn-nb">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-nb-white p-8">
      <div className="container mx-auto">
        <button
          onClick={() => navigate('/')}
          className="btn-nb mb-8"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="card-nb bg-nb-blue flex items-center justify-center h-96">
            <span className="text-nb-white text-nb-lg font-bold uppercase text-center px-4">
              {product.name}
            </span>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-nb-heading mb-4 text-nb-black">{product.name}</h1>

            <div className="card-nb mb-6">
              <p className="text-nb-lg font-bold text-nb-red mb-4">
                ₨ {product.price.toLocaleString()}
              </p>

              <p className="text-nb-sm font-bold uppercase mb-6 text-nb-blue">
                Stock: {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
              </p>

              <p className="text-nb-base leading-relaxed mb-6">
                {product.description}
              </p>

              {product.rating.count > 0 && (
                <div className="flex gap-4 items-center mb-6">
                  <div className="flex gap-1">
                    {'⭐'.repeat(Math.round(product.rating.average))}
                  </div>
                  <span className="text-nb-sm font-bold">
                    {product.rating.average.toFixed(1)} ({product.rating.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="card-nb bg-nb-yellow mb-6">
              <label className="block text-nb-sm uppercase font-bold mb-4">Quantity</label>
              <div className="flex gap-4 items-center mb-6">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input-nb w-24"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-nb-success w-full mb-4"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`w-full py-3 border-4 border-nb-black font-bold uppercase ${
                  isInWishlist
                    ? 'bg-nb-red text-nb-white'
                    : 'bg-nb-white text-nb-black hover:bg-nb-red hover:text-nb-white'
                } transition-colors shadow-nb-md`}
              >
                {isInWishlist ? '❤️ Saved' : '🤍 Save to Wishlist'}
              </button>
            </div>

            {/* Product Details */}
            {product.tags && product.tags.length > 0 && (
              <div className="card-nb">
                <h3 className="text-nb-sm uppercase font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-2 border-2 border-nb-black bg-nb-lime text-nb-black text-xs font-bold uppercase"
                    >
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
