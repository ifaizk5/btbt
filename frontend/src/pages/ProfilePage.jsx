import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { readStorage } from '../utils/storage.js';

const ORDERS_STORAGE_KEY = 'btbt:orders';

export default function ProfilePage() {
  const { user, accessToken } = useSelector((state) => state.auth);
  const orders = readStorage(ORDERS_STORAGE_KEY, []);
  const userOrders = user?.email
    ? orders.filter((order) => order.customerEmail === user.email)
    : [];

  const fullName = user?.firstName || user?.lastName
    ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
    : user?.email?.split('@')[0] || 'Member';
  const joinDate = user?.joinedAt || user?.createdAt || userOrders[0]?.createdAt;

  if (!accessToken) {
    return (
      <div className="premium-shell min-h-screen flex items-center justify-center px-4 py-10">
        <div className="premium-card w-full max-w-xl p-6 md:p-8 text-center">
          <div className="premium-kicker">Profile</div>
          <h1 className="premium-display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">Sign in to view your account</h1>
          <p className="premium-copy mt-5">
            Your profile, saved orders, and account details appear here once you are logged in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login" className="premium-button px-5 py-3">
              Login
            </Link>
            <Link to="/register" className="premium-button premium-button--ghost px-5 py-3">
              Create account
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
          <div className="premium-kicker">Profile</div>
          <h1 className="premium-display mt-3 text-[clamp(3rem,6vw,5.5rem)]">Your account</h1>
          <p className="premium-copy mt-5 max-w-2xl">
            Basic account details and the guest or saved orders associated with your email.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="premium-card p-6 md:p-8">
            <div className="premium-meta">Account details</div>
            <div className="mt-6 space-y-5">
              <div className="border-t border-[var(--color-line)] pt-4">
                <div className="premium-meta">Name</div>
                <p className="mt-2 text-xl text-[var(--color-text)]">{fullName}</p>
              </div>
              <div className="border-t border-[var(--color-line)] pt-4">
                <div className="premium-meta">Email</div>
                <p className="mt-2 text-xl text-[var(--color-text)]">{user?.email || 'Not available'}</p>
              </div>
              <div className="border-t border-[var(--color-line)] pt-4">
                <div className="premium-meta">Join date</div>
                <p className="mt-2 text-xl text-[var(--color-text)]">
                  {joinDate ? new Date(joinDate).toLocaleDateString() : 'Not available'}
                </p>
              </div>
            </div>
          </section>

          <section className="premium-card p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="premium-kicker">Order history</div>
                <h2 className="premium-title mt-3 text-[clamp(2rem,3vw,3rem)]">Recent orders</h2>
              </div>
              <span className="premium-pill">{userOrders.length} saved</span>
            </div>

            <div className="mt-6 space-y-4">
              {userOrders.length === 0 ? (
                <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5">
                  <p className="premium-meta">No saved orders yet</p>
                  <p className="premium-copy mt-3">
                    Checkout is guest-friendly, so you can still complete purchases without an account.
                  </p>
                </div>
              ) : (
                userOrders.map((order) => (
                  <article key={order._id} className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="premium-meta">Order {order._id}</div>
                        <p className="mt-2 text-lg text-[var(--color-text)]">
                          ₨ {Number(order.total || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="premium-meta">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(order.items || []).slice(0, 3).map((item) => (
                        <span key={`${order._id}-${item.product}`} className="premium-pill px-3 py-2 text-[0.64rem]">
                          {item.name || 'Product'} x {item.quantity}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
