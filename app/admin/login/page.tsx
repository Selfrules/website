'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      } else {
        // Successful login
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Authentication error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)',
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="brutal-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-black rounded-brutal shadow-brutal mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-heading font-black mb-2">
              Admin Login
            </h1>
            <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
              Enter your password to access the dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-brutal border-black rounded-brutal shadow-brutal-sm bg-white text-dark placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-brutal-colored-blue disabled:opacity-60 disabled:bg-gray-100 transition-all"
                placeholder="mattia@selfrules.org"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-brutal border-black rounded-brutal shadow-brutal-sm bg-white text-dark placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-brutal-colored-blue disabled:opacity-60 disabled:bg-gray-100 transition-all"
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brutalist-text-light/50 hover:text-brutalist-text-light transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-100 border-4 border-red-500 rounded-brutal">
                <p className="text-red-700 font-bold text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-6 py-3 bg-primary text-white font-bold border-brutal-thick border-black rounded-brutal shadow-brutal hover:shadow-brutal-sm hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            <p>Protected admin area - Authorized access only</p>
          </div>
        </div>

        {/* Development Hint */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-secondary/20 border-4 border-secondary rounded-brutal">
            <p className="text-sm font-bold text-secondary text-center">
              💡 Dev Mode: Set ADMIN_PASSWORD in .env
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
