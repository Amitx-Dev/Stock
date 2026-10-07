import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Check } from 'lucide-react';

export const UserModal = ({ isOpen, onClose, user = null, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TRADER');
  const [status, setStatus] = useState('ACTIVE');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!user;

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || 'TRADER');
      setStatus(user.status || 'ACTIVE');
    } else {
      setName('');
      setEmail('');
      setRole('TRADER');
      setStatus('ACTIVE');
    }
    setError('');
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onSave({
        id: user ? user.id : undefined,
        name: name.trim(),
        email: email.trim(),
        role,
        status
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit User Account' : 'Add New User'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:border-cyan-500 focus:outline-none"
            placeholder="e.g. Alex Morgan"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:border-cyan-500 focus:outline-none"
            placeholder="e.g. alex@trade.com"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            System Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:border-cyan-500 focus:outline-none"
          >
            <option value="TRADER">Trader (Access to stock trading, portfolio & history)</option>
            <option value="ADMIN">Administrator (Full system management & reports)</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Account Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:border-cyan-500 focus:outline-none"
          >
            <option value="ACTIVE">Active (Unrestricted trading privileges)</option>
            <option value="SUSPENDED">Suspended (Blocked from trading operations)</option>
          </select>
        </div>

        {error && (
          <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{submitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
