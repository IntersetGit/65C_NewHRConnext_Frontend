import { createContext, ReactNode, useEffect, useState } from 'react';
import type { AuthValuesType, UserDataType } from './types';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized,
  );

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true);
      const access = cookie.get('access');
      if (access) {
        setLoading(true);
      }
    };
  }, []);

  const value = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
