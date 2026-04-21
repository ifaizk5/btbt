import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/index.js';
import { setUser, setTokens, setError, setLoading } from '../redux/slices/authSlice.js';

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

      dispatch(setTokens({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }));

      dispatch(setUser({ email: formData.email }));
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
    <div className="min-h-screen bg-nb-yellow flex items-center justify-center p-4">
      <div className="card-nb max-w-md w-full">
        <h1 className="text-nb-heading mb-8 text-nb-red">Login</h1>

        {error && (
          <div className="mb-4 border-4 border-nb-red bg-nb-red p-4 text-nb-white font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-nb-sm uppercase font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-nb"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-nb-sm uppercase font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-nb"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-nb-primary w-full"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-nb-sm">
          Don't have an account?{' '}
          <a href="/register" className="font-bold underline text-nb-red hover:no-underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
