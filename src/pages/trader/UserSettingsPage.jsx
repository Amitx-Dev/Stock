import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Sparkles,
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';
import { USER_PROFILE } from '../../services/altIndexData';
import { useAuth } from '../../context/AuthContext';

export const UserSettingsPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || USER_PROFILE.name);
  const [email, setEmail] = useState(user?.email || USER_PROFILE.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword) return;
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Centered Card matching Screen 4 */}
      <div className="alt-card p-6 sm:p-8 space-y-8 shadow-md">
        {/* Title Header matching Screen 4 */}
        <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Check your information and feel to update your notification settings and password
          </p>
        </div>

        {/* Personal Information matching Screen 4 */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Personal Information
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
                />
              </div>
            </div>

            {/* Explanatory text from Screen 4 */}
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              With your email, you'll be subscribed to recommendation alerts such as reddit stock top mentions, average social mentions trends, job postings, web traffic, and more.
            </p>

            {profileSaved && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Profile information updated successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* Change Password matching Screen 4 */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Change Password
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
              />
            </div>

            {/* Purple Pill Button matching Screen 4 */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all"
              >
                Change Password
              </button>
            </div>

            {passwordSaved && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Password changed securely!</span>
              </div>
            )}
          </form>
        </div>

        {/* Upgrade Account Card matching Screen 4 */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Upgrade Account
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Upgrade your account to get access to larger portfolio and more tools options.
          </p>
          <div className="pt-1">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline inline-flex items-center gap-1"
            >
              <span>Upgrade account now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AltIndex Enterprise Tier
              </h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Unlimited Alternative Datasets & Live API Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Sub-second Reddit, Twitter & Glassdoor Sentiment Feeds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Institutional Portfolio Optimization & Backtesting</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Account upgraded to Institutional Pro!');
                setShowUpgradeModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              Confirm Upgrade ($99/mo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
