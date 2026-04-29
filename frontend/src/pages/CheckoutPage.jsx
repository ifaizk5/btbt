import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { orderAPI, cartAPI } from '../api/index.js';
import { clearCart } from '../redux/slices/cartSlice.js';
import { readStorage, writeStorage } from '../utils/storage.js';

const ORDERS_STORAGE_KEY = 'btbt:orders';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { accessToken, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  });
  const [submittedOrder, setSubmittedOrder] = useState(null);

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
      const guestOrder = {
        _id: `guest-${Date.now()}`,
        items: items.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          variant: item.variant,
        })),
        shippingAddress: shippingData,
        paymentMethod: 'guest-checkout',
        customerEmail: user?.email || null,
        total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      let placedOrder = guestOrder;

      if (accessToken) {
        try {
          const { data } = await orderAPI.create({
            items: guestOrder.items.map((item) => ({
              product: item.product,
              quantity: item.quantity,
              variant: item.variant,
            })),
            shippingAddress: shippingData,
            paymentMethod: 'mock',
          });

          placedOrder = {
            ...guestOrder,
            _id: data.data._id,
            status: data.data.status || 'confirmed',
          };
        } catch (orderError) {
          placedOrder = guestOrder;
        }
      }

      const existingOrders = readStorage(ORDERS_STORAGE_KEY, []);
      writeStorage(ORDERS_STORAGE_KEY, [placedOrder, ...existingOrders]);

      dispatch(clearCart());
      await cartAPI.clear().catch(() => null);

      setSubmittedOrder(placedOrder);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create order');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center px-4">
        <div className="premium-card max-w-lg p-6 text-center md:p-8">
          <p className="premium-meta">Your cart is empty</p>
          <Link to="/" className="premium-button mt-6 px-5 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.17);
  const shipping = 200;
  const total = subtotal + tax + shipping;

  if (submittedOrder) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center px-4 py-10">
        <div className="premium-card w-full max-w-3xl p-6 md:p-8">
          <div className="premium-kicker">Order placed</div>
          <h1 className="premium-display mt-3 text-[clamp(2.8rem,5vw,5rem)]">Thank you.</h1>
          <p className="premium-copy mt-5 max-w-2xl">
            Your order has been captured as a guest checkout. You can optionally sign in or create
            an account to keep future orders and details together.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="premium-card--flat p-4">
              <div className="premium-meta">Order ID</div>
              <p className="mt-2 text-lg text-[var(--color-text)]">{submittedOrder._id}</p>
            </div>
            <div className="premium-card--flat p-4">
              <div className="premium-meta">Total</div>
              <p className="mt-2 text-lg text-[var(--color-text)]">₨ {submittedOrder.total.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="premium-button px-5 py-3">
              Login to save order
            </Link>
            <Link to="/register" className="premium-button premium-button--ghost px-5 py-3">
              Sign up
            </Link>
            <Link to="/" className="premium-button premium-button--ghost px-5 py-3">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-shell min-h-screen">
      <div className="premium-container py-8 lg:py-12">
        <div className="max-w-3xl">
          <div className="premium-kicker">Checkout</div>
          <h1 className="premium-display mt-3 text-[clamp(3rem,6vw,5.5rem)]">Place your order</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:items-start">
          <div className="space-y-6">
            <div className="premium-card p-6 md:p-8">
              <div className="premium-kicker">Shipping address</div>

              <form onSubmit={handleSubmitOrder} className="mt-6 space-y-5">
                <div>
                  <label className="premium-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingData.street}
                    onChange={handleChange}
                    required
                    className="premium-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="premium-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleChange}
                      required
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <label className="premium-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingData.state}
                      onChange={handleChange}
                      required
                      className="premium-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="premium-label">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingData.zipCode}
                      onChange={handleChange}
                      required
                      className="premium-input"
                    />
                  </div>
                  <div>
                    <label className="premium-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingData.country}
                      onChange={handleChange}
                      className="premium-input"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <p className="premium-meta text-[#8f5c4e] mb-4">
                    This is a mock store. No real charges will be made.
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="premium-button w-full px-5 py-3"
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <aside className="premium-drawer sticky top-24 p-6 md:p-7">
            <div className="premium-kicker">Order summary</div>
            <h2 className="premium-title mt-3 text-[clamp(2rem,3vw,3rem)]">Balanced totals</h2>

            <div className="mt-6 space-y-3 max-h-72 overflow-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-3 text-sm"
                >
                  <span className="max-w-[14rem] text-[var(--color-text)]">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    ₨ {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="premium-divider my-6" />

            <div className="space-y-3 text-sm text-[var(--color-muted)]">
              <div className="flex justify-between gap-4"><span>Subtotal</span><span>₨ {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between gap-4"><span>Tax (17%)</span><span>₨ {tax.toLocaleString()}</span></div>
              <div className="flex justify-between gap-4"><span>Shipping</span><span>₨ {shipping}</span></div>
            </div>

            <div className="premium-divider my-6" />

            <div className="flex justify-between gap-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              <span>Total</span>
              <span>₨ {total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
