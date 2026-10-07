import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Activity, Shield, TrendingUp, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const LoginPage = ({ onNavigateRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('trader@trade.com');
  const [password, setPassword] = useState('trader123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'ADMIN') {
      setEmail('admin@trade.com');
      setPassword('admin123');
    } else {
      setEmail('trader@trade.com');
      setPassword('trader123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient fintech glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-xl shadow-cyan-500/20 mb-3">
          <Activity className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Sign In to <span className="text-cyan-400">TradeNova</span>
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Online Stock Trading & Portfolio Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="fintech-card p-6 sm:p-8">
          {/* Quick Demo Pre-fill Buttons */}
          <div className="mb-6 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider text-center">
              ⚡ College Evaluation Quick Logins
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('TRADER')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 text-xs font-bold transition-all"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Demo Trader</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('ADMIN')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700/80 text-purple-300 text-xs font-bold transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2.5 pl-9 pr-3 text-white text-xs placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  placeholder="name@trade.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2.5 pl-9 pr-3 text-white text-xs placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 transition-all"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            Don't have an account?{' '}
            <button
              onClick={onNavigateRegister}
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline ml-1"
            >
              Register New Trader
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
