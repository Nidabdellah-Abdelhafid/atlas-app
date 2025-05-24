import React, { createContext, useContext, useState } from 'react';
import { jwtTokenService } from '../services/auth/jwtTokenService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(jwtTokenService.loggedIn());

  const changeStatus = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, changeStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};