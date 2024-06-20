import React, { createContext, useState } from 'react';
import * as authService from './authServices';
export const AuthContext = createContext(null);

// Provide authenticate state and all auth function relate to entire application
export function AuthProvider({ children }) {
  const login= async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data) {
        return {...data};
      } else {
        console.error('No data or token received on login');
        return null; 
      }
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };
  
  const auth = <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
  return auth;
}