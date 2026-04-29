import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice.js';
import { selectWishlistItems } from '../redux/slices/wishlistSlice.js';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const wishlistItems = useSelector(selectWishlistItems);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="premium-header">
      <div className="premium-container py-4 lg:py-5">
        <div className="flex flex-col gap-4 rounded-[30px] border border-[var(--color-line)] bg-[rgba(255,253,250,0.7)] px-4 py-4 shadow-[0_12px_40px_rgba(26,26,26,0.04)] lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[0.72rem] font-bold tracking-[0.28em] text-[var(--color-text)]">
                BTBT
              </span>
              <span className="max-w-[11rem] text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-text)]">
                Bean There, Brew That
              </span>
            </Link>

            <div className="premium-meta lg:hidden">Premium coffee brewing sets</div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:justify-end">
            <Link to="/" className="premium-nav-link">
              Shop
            </Link>
            <Link to="/cart" className="premium-nav-link relative pr-5">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-1 text-[0.65rem] font-bold text-[var(--color-text)]">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="premium-nav-link relative pr-5">
              Wishlist
              {wishlistItems.length > 0 && (
                <span className="absolute -right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-1 text-[0.65rem] font-bold text-[var(--color-text)]">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {accessToken && user?.role === 'admin' && (
              <Link to="/admin" className="premium-nav-link">
                Admin
              </Link>
            )}

            {accessToken && (
              <Link to="/profile" className="premium-nav-link">
                Profile
              </Link>
            )}

            {accessToken ? (
              <>
                <span className="premium-pill">{user?.firstName || 'Account'}</span>
                <button onClick={handleLogout} className="premium-button premium-button--ghost px-4 py-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="premium-button premium-button--ghost px-4 py-2">
                  Login
                </Link>
                <Link to="/register" className="premium-button px-4 py-2">
                  Join the list
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
