'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginContextProps } from '@/app/types';

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

const getUserFromLocalStorage = (): User => {
  const storedUser = localStorage.getItem('account');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    avatar: '',
    role: '',
    status: '',
    address: '',
    date: '',
    phone: '',
  };
};

const isLoggedIn = (): boolean => {
  const storedUser = localStorage.getItem('account');
  return !!storedUser;
};

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());
  const [user, setUser] = useState<User>(getUserFromLocalStorage);
  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>{children}</LoginContext.Provider>;
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
