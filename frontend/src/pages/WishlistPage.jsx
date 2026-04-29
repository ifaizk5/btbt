import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice.js';
import { removeWishlistItem, selectWishlistItems } from '../redux/slices/wishlistSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { mediaAPI } from '../api/index.js';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistItems);
  const [isLoading, setIsLoading] = useState(true);
  const [listedProductImages, setListedProductImages] = useState([]);

  useEffect(() => {
    fetchListedProductImages();
    setIsLoading(false);
  }, []);

  const fetchListedProductImages = async () => {
    try {
      const { data } = await mediaAPI.getListedProducts();
      setListedProductImages(data.data.files || []);
    } catch (err) {
      setListedProductImages([]);
    }
  };

  const handleRemove = async (productId) => {
    dispatch(removeWishlistItem({ productId }));
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      product,
      quantity: 1,
      variant: null,
    }));
    alert('Added to cart!');
  };

  if (isLoading) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center">
        <p className="premium-meta">Loading wishlist</p>
      </div>
    );
  }

  return (
    <div className="premium-shell min-h-screen">
      <div className="premium-container py-8 lg:py-12">
        <div className="max-w-3xl">
          <div className="premium-kicker">Saved objects</div>
          <h1 className="premium-display mt-3 text-[clamp(3rem,6vw,5.5rem)]">Wishlist</h1>
        </div>

        {!wishlist || wishlist.length === 0 ? (
          <div className="premium-card mt-8 max-w-xl p-6 text-center md:p-8">
            <p className="premium-meta">Your wishlist is empty</p>
            <a href="/" className="premium-button mt-6 px-5 py-3">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="premium-grid premium-grid--editorial mt-8">
            {wishlist.map((product, index) => {
              const image = listedProductImages.length > 0
                ? listedProductImages[index % listedProductImages.length]
                : '/coffee_mug.png';

              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  image={image}
                  isWishlisted={true}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={(wishlistProduct) => handleRemove(wishlistProduct._id)}
                  className="lg:col-span-4"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
