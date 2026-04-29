import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/index.js';
import { setUser, setTokens, setError } from '../redux/slices/authSlice.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');

    try {
      const { data } = await authAPI.login(formData);

      dispatch(
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );

      dispatch(setUser({ email: formData.email, lastLoginAt: new Date().toISOString() }));
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-shell min-h-screen flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-0 overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[rgba(255,253,250,0.88)] shadow-[0_20px_80px_rgba(26,26,26,0.06)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between border-r border-[var(--color-line)] bg-[linear-gradient(180deg,#f3ede3_0%,#fbf8f3_100%)] p-8 lg:flex">
          <div>
            <div className="premium-kicker">Member access</div>
            <h1 className="premium-display mt-4 text-[clamp(3rem,6vw,5rem)]">Welcome back.</h1>
            <p className="premium-copy mt-5 max-w-md">
              Continue your brewing ritual with a quiet, frictionless sign-in.
            </p>
          </div>
          <div className="space-y-3">
            <div className="premium-divider" />
            <p className="premium-meta">Bean There, Brew That</p>
            <p className="text-sm text-[var(--color-muted)]">
              Premium equipment, careful language, and a checkout flow designed to feel calm.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <div className="premium-kicker">Login</div>
          <h1 className="premium-display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">Sign in</h1>

          {error && (
            <div className="mt-6 rounded-[18px] border border-[#d8b1a8] bg-[#f8efec] p-4 text-sm text-[#7b3c30]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="premium-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="premium-input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="premium-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="premium-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={isLoading} className="premium-button w-full px-5 py-3">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[var(--color-text)] underline decoration-[var(--color-accent)] decoration-1 underline-offset-4 hover:decoration-transparent"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
