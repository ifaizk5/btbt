import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/index.js';
import { setUser, setTokens, setError, setLoading } from '../redux/slices/authSlice.js';

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

      dispatch(setTokens({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }));

      dispatch(setUser({ email: formData.email }));
      navigate('/');
    } catch (err) {
      const details = err.response?.data?.error?.details;
      const detailedMessage = details
        ? Object.values(details)[0]
        : null;
      const message =
        detailedMessage || err.response?.data?.message || 'Registration failed';
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nb-cyan flex items-center justify-center p-4">
      <div className="card-nb max-w-md w-full">
        <h1 className="text-nb-heading mb-8 text-nb-blue">Register</h1>

        {error && (
          <div className="mb-4 border-4 border-nb-red bg-nb-red p-4 text-nb-white font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-nb-sm uppercase font-bold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-nb"
              />
            </div>
            <div>
              <label className="block text-nb-sm uppercase font-bold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-nb"
              />
            </div>
          </div>

          <div>
            <label className="block text-nb-sm uppercase font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-nb"
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
            />
          </div>

          <div>
            <label className="block text-nb-sm uppercase font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-nb"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-nb-secondary w-full"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-nb-sm">
          Already have an account?{' '}
          <a href="/login" className="font-bold underline text-nb-blue hover:no-underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
