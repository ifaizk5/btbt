import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice.js';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="nb-marquee bg-nb-cyan">
        <div className="nb-marquee-track">
          <span className="nb-marquee-item">BEAN THERE, BREW THAT</span>
          <span className="nb-marquee-item">COFFEE BREWING SETS IN PKR</span>
          <span className="nb-marquee-item">FREE SHIPPING OVER PKR 12,000</span>
          <span className="nb-marquee-item">AEROPRESS • V60 • FRENCH PRESS • GRINDERS</span>
          <span className="nb-marquee-item">BEAN THERE, BREW THAT</span>
          <span className="nb-marquee-item">COFFEE BREWING SETS IN PKR</span>
          <span className="nb-marquee-item">FREE SHIPPING OVER PKR 12,000</span>
          <span className="nb-marquee-item">AEROPRESS • V60 • FRENCH PRESS • GRINDERS</span>
        </div>
      </div>

      <div className="border-b-4 border-nb-black bg-nb-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-4 border-nb-black bg-nb-yellow p-2 shadow-[8px_8px_0px_#000]">
          <Link
            to="/"
            className="px-4 py-2 text-lg md:text-2xl font-black uppercase tracking-tight border-4 border-nb-black bg-nb-white"
          >
            BEAN THERE, BREW THAT
          </Link>

          <nav className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
            <Link to="/" className="btn-nb px-3 py-2 text-sm">Brew Shop</Link>
            <Link to="/wishlist" className="btn-nb-secondary px-3 py-2 text-sm">Wishlist</Link>
            <Link to="/cart" className="btn-nb px-3 py-2 text-sm relative">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -right-2 -top-2 h-6 min-w-6 border-2 border-nb-black bg-nb-lime px-1 text-center text-xs font-bold leading-5">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {accessToken && user?.role === 'admin' && (
              <Link to="/admin" className="btn-nb-secondary px-3 py-2 text-sm">Admin</Link>
            )}

            {accessToken ? (
              <>
                <span className="nb-badge bg-nb-cyan">{user?.firstName || 'Account'}</span>
                <button onClick={handleLogout} className="btn-nb-primary px-3 py-2 text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-nb px-3 py-2 text-sm">Login</Link>
                <Link to="/register" className="btn-nb-primary px-3 py-2 text-sm">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
