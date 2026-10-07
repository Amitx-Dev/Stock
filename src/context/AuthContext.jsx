import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const DEFAULT_USER = {
    id: 1,
    name: 'Alex Smith',
    email: 'alexsmith16@gmail.com',
    role: 'Fund Manager',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  };

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('stock_auth_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('stock_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('stock_auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const users = await api.getUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!found) {
        throw new Error('No account found with this email address.');
      }
      if (found.status === 'SUSPENDED') {
        throw new Error('Your trading account has been suspended. Please contact Admin.');
      }

      setUser(found);
      return found;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password, role = 'TRADER' }) => {
    setLoading(true);
    try {
      const users = await api.getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = await api.createUser({ name, email, role });
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = async (targetRole) => {
    const users = await api.getUsers();
    const demoUser = users.find(u => u.role === targetRole && u.status === 'ACTIVE');
    if (demoUser) {
      setUser(demoUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role || null,
      isAdmin: user?.role === 'ADMIN',
      isTrader: user?.role === 'TRADER',
      login,
      register,
      logout,
      switchDemoRole,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
