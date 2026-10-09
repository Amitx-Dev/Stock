import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  TrendingUp,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'Admin' : 'Trader';
  const initialPhone = searchParams.get('phone') || '';

  const [role, setRole] = useState(initialRole);
  const [tab, setTab] = useState(initialPhone ? 'otp' : 'email'); // 'email' or 'otp'
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState(initialPhone);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [rememberMe, setRememberMe] = useState(false);

  // States
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { login, loginWithOtp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Handle OTP 6 box change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const validate = () => {
    const errs = {};
    if (tab === 'email') {
      if (!email.trim()) {
        errs.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errs.email = 'Please enter a valid email address';
      }

      if (!password) {
        errs.password = 'Password is required';
      } else if (password.length < 6) {
        errs.password = 'Password must be at least 6 characters';
      }
    } else {
      if (!mobile.trim() || mobile.length < 10) {
        errs.mobile = 'Enter a valid 10-digit mobile number';
      }
      const otpStr = otp.join('');
      if (otpStr.length < 6) {
        errs.otp = 'Please enter the complete 6-digit OTP';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsLoading(false);
      let res;
      if (tab === 'email') {
        res = login(email, password, role);
      } else {
        res = loginWithOtp(mobile, otp.join(''), role);
      }

      if (res.success) {
        setSuccessMsg(`Welcome, ${res.user.name}! Redirecting to ${role} Portal...`);
        showToast(`Authenticated successfully as ${role}`, 'success');
        
        setTimeout(() => {
          if (role.toLowerCase() === 'admin') {
            navigate('/admin/users');
          } else {
            navigate('/trader/trading');
          }
        }, 600);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Branded Illustration / Marketing Panel */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 p-12 text-white flex-col justify-between relative overflow-hidden">
          {/* Subtle glow shapes */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6 text-brand-300" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">TradeNest</span>
                <span className="block text-[10px] font-bold text-brand-300 uppercase tracking-widest">
                  Secure Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Marketing Highlights */}
          <div className="relative z-10 space-y-8 my-auto py-12">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-200 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Institutional Grade Architecture
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
                Powering India's fastest growing retail trading community.
              </h2>
              <p className="text-sm text-brand-100/80 leading-relaxed">
                Seamless order routing, sub-millisecond market feeds, and zero brokerage on all equity investments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-trade-green flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1.2ms Execution Latency</h4>
                  <p className="text-[11px] text-brand-200/70">Ultra low latency trading engine direct to exchanges</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-brand-300 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">ISO 27001 & 2FA Enforced</h4>
                  <p className="text-[11px] text-brand-200/70">Multi-tier encryption for ledger accounts and credentials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom regulatory note */}
          <div className="relative z-10 text-[11px] text-brand-300/70 pt-6 border-t border-white/10">
            SEBI Reg. INZ000000000 • CDSL Depository Participant 12080000
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-brand-700 text-white flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white">TradeNest</span>
                </Link>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access your trading workspace.
              </p>
            </div>

            {/* Role Selector (Admin | Trader) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Select Portal Role
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setRole('Trader')}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                    role === 'Trader'
                      ? 'bg-brand-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Trader Portal
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Admin')}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                    role === 'Admin'
                      ? 'bg-purple-800 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Admin Portal
                </button>
              </div>
            </div>

            {/* Tabs: Email+Password / Mobile OTP */}
            <div className="border-b border-slate-200 dark:border-slate-800 flex gap-6 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setTab('email')}
                className={`pb-3 transition-colors relative ${
                  tab === 'email'
                    ? 'text-brand-700 dark:text-brand-300 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Email & Password
                {tab === 'email' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-700 dark:bg-brand-400 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setTab('otp')}
                className={`pb-3 transition-colors relative ${
                  tab === 'otp'
                    ? 'text-brand-700 dark:text-brand-300 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Mobile OTP
                {tab === 'otp' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-700 dark:bg-brand-400 rounded-full" />
                )}
              </button>
            </div>

            {/* Success message banner */}
            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-trade-green shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {tab === 'email' ? (
                <>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder={role === 'Admin' ? 'admin@tradenest.in' : 'name@example.com'}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-trade-red mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Password reset link sent to your registered email', 'info')}
                        className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.password
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-trade-red mt-1 font-medium">{errors.password}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value.replace(/\D/g, ''));
                          if (errors.mobile) setErrors({ ...errors, mobile: '' });
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                          errors.mobile
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-xs text-trade-red mt-1 font-medium">{errors.mobile}</p>
                    )}
                  </div>

                  {/* 6 OTP Boxes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Enter 6-Digit Verification Code
                      </label>
                    </div>
                    <div className="flex gap-2 justify-between">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-xs text-trade-red mt-1 font-medium">{errors.otp}</p>
                    )}
                  </div>
                </>
              )}

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-brand-700 focus:ring-brand-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-xs text-slate-600 dark:text-slate-400 select-none cursor-pointer"
                >
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit button with loading state */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-70 text-white font-bold text-sm shadow-md shadow-brand-700/25 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to {role} Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer signup link */}
            <div className="pt-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              New to TradeNest?{' '}
              <Link
                to="/"
                className="font-bold text-brand-700 dark:text-brand-300 hover:underline"
              >
                Open an Account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
