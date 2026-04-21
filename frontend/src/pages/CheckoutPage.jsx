import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderAPI, cartAPI } from '../api/index.js';
import { clearCart } from '../redux/slices/cartSlice.js';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  });

  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          variant: item.variant,
        })),
        shippingAddress: shippingData,
        paymentMethod: 'mock',
      };

      const { data } = await orderAPI.create(orderData);

      // Clear cart
      dispatch(clearCart());
      await cartAPI.clear();

      // Redirect to order confirmation
      alert(`Order created! Order ID: ${data.data._id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <div className="card-nb text-center">
          <p className="text-nb-lg font-bold uppercase mb-6">Please login to checkout</p>
          <a href="/login" className="btn-nb-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-nb-white flex items-center justify-center">
        <div className="card-nb text-center">
          <p className="text-nb-lg font-bold uppercase mb-6">Your cart is empty</p>
          <a href="/" className="btn-nb">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.17);
  const shipping = 200;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-nb-white p-8">
      <div className="container mx-auto">
        <h1 className="text-nb-heading mb-8 text-nb-blue">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping Address Form */}
            <div className="card-nb mb-8">
              <h2 className="text-nb-title font-bold uppercase mb-6">Shipping Address</h2>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-nb-sm uppercase font-bold mb-2">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingData.street}
                    onChange={handleChange}
                    required
                    className="input-nb"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-nb-sm uppercase font-bold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleChange}
                      required
                      className="input-nb"
                    />
                  </div>
                  <div>
                    <label className="block text-nb-sm uppercase font-bold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingData.state}
                      onChange={handleChange}
                      required
                      className="input-nb"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-nb-sm uppercase font-bold mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingData.zipCode}
                      onChange={handleChange}
                      required
                      className="input-nb"
                    />
                  </div>
                  <div>
                    <label className="block text-nb-sm uppercase font-bold mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingData.country}
                      onChange={handleChange}
                      className="input-nb"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-nb-sm font-bold uppercase text-nb-red mb-4">
                    ⚠️ This is a MOCK store. No real charges will be made.
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-nb-success w-full"
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-nb sticky top-8">
              <h2 className="text-nb-title font-bold uppercase mb-6 pb-4 border-b-4 border-nb-black">
                Order Summary
              </h2>

              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product._id} className="text-nb-xs uppercase font-bold">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="float-right">₨ {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pb-6 border-b-4 border-nb-black mb-6">
                <div className="flex justify-between text-nb-sm uppercase font-bold">
                  <span>Subtotal:</span>
                  <span>₨ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-nb-sm uppercase font-bold">
                  <span>Tax (17%):</span>
                  <span>₨ {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-nb-sm uppercase font-bold">
                  <span>Shipping:</span>
                  <span>₨ {shipping}</span>
                </div>
              </div>

              <div className="flex justify-between text-nb-lg font-bold uppercase">
                <span>TOTAL:</span>
                <span className="text-nb-red">₨ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
