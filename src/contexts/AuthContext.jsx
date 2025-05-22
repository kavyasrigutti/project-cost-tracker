import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if we have a user in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback((email, password) => {
    // In a real app, we'd make an API call here
    // For this demo, we'll just store the email
    const userData = { email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  }, []);

  const register = useCallback((email, password) => {
    // In a real app, we'd make an API call here
    // For this demo, we'll just store the email
    const userData = { email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};