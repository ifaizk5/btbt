import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/index.js';
import { setUser, setTokens, setError } from '../redux/slices/authSlice.js';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await authAPI.register(formData);

      dispatch(
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );

      dispatch(
        setUser({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: 'customer',
          joinedAt: new Date().toISOString(),
        })
      );
      navigate('/');
    } catch (err) {
      const details = err.response?.data?.error?.details;
      const detailedMessage = details ? Object.values(details)[0] : null;
      const message = detailedMessage || err.response?.data?.message || 'Registration failed';
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-shell min-h-screen flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-0 overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[rgba(255,253,250,0.88)] shadow-[0_20px_80px_rgba(26,26,26,0.06)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 border-t border-[var(--color-line)] p-6 md:p-8 lg:order-1 lg:border-t-0 lg:border-r lg:p-10">
          <div className="premium-kicker">Create account</div>
          <h1 className="premium-display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">Join the list</h1>

          {error && (
            <div className="mt-6 rounded-[18px] border border-[#d8b1a8] bg-[#f8efec] p-4 text-sm text-[#7b3c30]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="premium-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="premium-input"
                />
              </div>
              <div>
                <label className="premium-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="premium-input"
                />
              </div>
            </div>

            <div>
              <label className="premium-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="premium-input"
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
              />
            </div>

            <div>
              <label className="premium-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="premium-input"
              />
            </div>

            <button type="submit" disabled={isLoading} className="premium-button w-full px-5 py-3">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[var(--color-text)] underline decoration-[var(--color-accent)] decoration-1 underline-offset-4 hover:decoration-transparent"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="order-1 flex flex-col justify-between bg-[linear-gradient(180deg,#f3ede3_0%,#fbf8f3_100%)] p-6 md:p-8 lg:order-2 lg:p-10">
          <div>
            <div className="premium-kicker">Ritual access</div>
            <h2 className="premium-display mt-4 text-[clamp(3rem,6vw,5rem)]">Create your account.</h2>
            <p className="premium-copy mt-5 max-w-md">
              Save favorites, track orders, and complete the brewing ritual with a calmer checkout.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {['Wishlist sync', 'Faster checkout', 'Saved address', 'Order history'].map((item) => (
              <div key={item} className="premium-card--flat p-4">
                <div className="premium-meta">Included</div>
                <p className="mt-2 text-sm text-[var(--color-text)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
