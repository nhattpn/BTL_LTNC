import { useContext } from 'react';
import { AuthContext } from './authContext';

// Provide custom hook to package authentication
export function useAuth() {
  return useContext(AuthContext);
}