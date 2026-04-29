import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateItem } from '../redux/slices/cartSlice.js';
import { getProductImageAlt, getProductImageUrl } from '../utils/productImage.js';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const handleRemoveItem = (productId, variant) => {
    dispatch(removeItem({ productId, variant }));
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    dispatch(updateItem({ productId, quantity }));
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);

  return (
    <div className="premium-shell min-h-screen">
      <div className="premium-container py-8 lg:py-12">
        <div className="max-w-3xl">
          <div className="premium-kicker">Order review</div>
          <h1 className="premium-display mt-3 text-[clamp(3rem,6vw,5.5rem)]">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="premium-card mt-8 max-w-xl p-6 text-center md:p-8">
            <p className="premium-meta">Your cart is empty</p>
            <Link to="/" className="premium-button mt-6 px-5 py-3">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_380px] lg:items-start">
            <section className="space-y-4">
              {items.map((item) => (
                <article key={item.product._id} className="premium-card p-4 md:p-5">
                  <div className="grid gap-5 md:grid-cols-[96px_1fr_auto] md:items-center">
                    <div className="overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                      <img
                        src={getProductImageUrl(item.product)}
                        alt={getProductImageAlt(item.product)}
                        className="h-24 w-24 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/coffee_mug.png';
                        }}
                      />
                    </div>

                    <div>
                      <div className="premium-meta">{item.product.category}</div>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                        {item.product.name}
                      </h3>
                      <p className="mt-3 text-sm text-[var(--color-muted)]">
                        ₨ {item.product.price.toLocaleString()} each
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <button
                        onClick={() => handleRemoveItem(item.product._id, item.variant)}
                        className="premium-button premium-button--ghost px-4 py-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-4">
                    <div className="flex items-center gap-3">
                      <label className="premium-meta">Qty</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.product._id, parseInt(e.target.value, 10))
                        }
                        className="premium-input w-24"
                      />
                    </div>
                    <p className="premium-meta">
                      Subtotal: ₨ {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </section>

            <aside className="premium-drawer sticky top-24 h-fit p-6 md:p-7 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
              <div className="premium-kicker">Order summary</div>
              <h2 className="premium-title mt-3 text-[clamp(2rem,3vw,3rem)]">Quiet checkout</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-sm text-[var(--color-muted)]">
                  <span>Subtotal</span>
                  <span>₨ {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm text-[var(--color-muted)]">
                  <span>Tax (17%)</span>
                  <span>₨ {Math.round(calculateTotal() * 0.17).toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm text-[var(--color-muted)]">
                  <span>Shipping</span>
                  <span>₨ 200</span>
                </div>
              </div>

              <div className="premium-divider my-6" />

              <div className="flex justify-between gap-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                <span>Total</span>
                <span>₨ {(calculateTotal() + Math.round(calculateTotal() * 0.17) + 200).toLocaleString()}</span>
              </div>

              <button onClick={() => navigate('/checkout')} className="premium-button mt-6 w-full px-5 py-3">
                Proceed to checkout
              </button>

              <Link to="/" className="premium-button premium-button--ghost mt-3 w-full px-5 py-3">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
