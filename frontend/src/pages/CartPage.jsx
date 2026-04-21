import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartAPI } from '../api/index.js';
import { setCart, removeItem, updateItem } from '../redux/slices/cartSlice.js';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      fetchCart();
    }
  }, [accessToken]);

  const fetchCart = async () => {
    try {
      const { data } = await cartAPI.get();
      dispatch(setCart(data.data));
    } catch (err) {
      console.error('Failed to load cart');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartAPI.remove(productId);
      dispatch(removeItem({ productId }));
    } catch (err) {
      console.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await cartAPI.update(productId, { quantity });
      dispatch(updateItem({ productId, quantity }));
    } catch (err) {
      console.error('Failed to update quantity');
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <div className="card-nb text-center">
          <p className="text-nb-lg font-bold uppercase mb-6">Please login to view your cart</p>
          <Link to="/login" className="btn-nb-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nb-white p-8">
      <div className="container mx-auto">
        <h1 className="text-nb-heading mb-8 text-nb-blue">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="card-nb text-center">
            <p className="text-nb-lg font-bold uppercase mb-6">Your cart is empty</p>
            <Link to="/" className="btn-nb">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product._id} className="card-nb">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-nb-sm font-bold uppercase mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-nb-lg font-bold text-nb-red mb-4">
                          ₨ {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="btn-nb-primary px-3 py-2 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-nb-sm font-bold uppercase">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.product._id, parseInt(e.target.value))
                        }
                        className="input-nb w-20"
                      />
                      <p className="text-nb-sm font-bold">
                        Subtotal: ₨ {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card-nb sticky top-8">
                <h2 className="text-nb-title font-bold uppercase mb-6 pb-4 border-b-4 border-nb-black">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-nb-sm uppercase font-bold">
                    <span>Subtotal:</span>
                    <span>₨ {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-nb-sm uppercase font-bold">
                    <span>Tax (17%):</span>
                    <span>₨ {Math.round(calculateTotal() * 0.17).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-nb-sm uppercase font-bold">
                    <span>Shipping:</span>
                    <span>₨ 200</span>
                  </div>
                </div>

                <div className="border-t-4 border-b-4 border-nb-black py-4 mb-6">
                  <div className="flex justify-between text-nb-lg font-bold uppercase">
                    <span>Total:</span>
                    <span className="text-nb-red">
                      ₨ {(calculateTotal() + Math.round(calculateTotal() * 0.17) + 200).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-nb-success w-full mb-4"
                >
                  Proceed to Checkout
                </button>

                <Link to="/" className="btn-nb w-full text-center block">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
