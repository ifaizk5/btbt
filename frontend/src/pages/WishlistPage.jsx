import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistAPI } from '../api/index.js';
import { setCart } from '../redux/slices/cartSlice.js';
import { addItem } from '../redux/slices/cartSlice.js';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const [wishlist, setWishlist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      fetchWishlist();
    }
  }, [accessToken]);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const { data } = await wishlistAPI.get();
      setWishlist(data.data);
    } catch (err) {
      console.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.remove(productId);
      setWishlist({
        ...wishlist,
        products: wishlist.products.filter((p) => p.product._id !== productId),
      });
    } catch (err) {
      console.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product,
      quantity: 1,
      variant: null,
    }));
    alert('Added to cart!');
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <div className="card-nb text-center">
          <p className="text-nb-lg font-bold uppercase mb-6">Please login to view wishlist</p>
          <a href="/login" className="btn-nb-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <p className="text-nb-lg font-bold uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nb-white p-8">
      <div className="container mx-auto">
        <h1 className="text-nb-heading mb-8 text-nb-red">❤️ Wishlist</h1>

        {!wishlist || wishlist.products.length === 0 ? (
          <div className="card-nb text-center">
            <p className="text-nb-lg font-bold uppercase mb-6">Your wishlist is empty</p>
            <a href="/" className="btn-nb">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.products.map((item) => (
              <div key={item.product._id} className="card-nb hover:shadow-nb-xl transition">
                <div className="h-48 bg-nb-purple mb-4 border-4 border-nb-black flex items-center justify-center">
                  <span className="text-nb-white text-nb-sm uppercase font-bold text-center px-2">
                    {item.product.name.substring(0, 20)}...
                  </span>
                </div>
                <h3 className="text-nb-sm font-bold uppercase mb-2 line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-nb-lg font-bold text-nb-red mb-4">
                  ₨ {item.product.price.toLocaleString()}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="btn-nb-success w-full"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="btn-nb-primary w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
