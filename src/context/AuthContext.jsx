import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Purely in-memory state as explicitly requested (no localStorage)
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password, selectedRole = 'Trader') => {
    // Validate credentials
    const roleNormalized = selectedRole.toLowerCase();
    
    let userObj = null;
    if (roleNormalized === 'admin') {
      userObj = {
        name: 'Vikram Malhotra',
        email: email || 'admin@tradenest.in',
        role: 'Admin',
        avatar: 'VM',
        permissions: ['all']
      };
    } else {
      userObj = {
        name: 'Aanya Sharma',
        email: email || 'aanya.sharma@tradenest.in',
        role: 'Trader',
        avatar: 'AS',
        accountNo: 'TN8839120',
        funds: 262618.20
      };
    }

    setCurrentUser(userObj);
    return { success: true, user: userObj };
  };

  const loginWithOtp = (mobile, otp, selectedRole = 'Trader') => {
    return login(
      selectedRole.toLowerCase() === 'admin' ? 'admin@tradenest.in' : 'aanya.sharma@tradenest.in',
      'secret',
      selectedRole
    );
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        role: currentUser?.role,
        login,
        loginWithOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
