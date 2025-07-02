'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginContextProps } from '@/app/types';
import { toast } from 'react-toastify';

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

const getUserFromLocalStorage = (): User => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('account');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
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
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('account');
    return !!storedUser;
  }
  return false;
};

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());
  const [user, setUser] = useState<User>(getUserFromLocalStorage);

  useEffect(() => {
    // Nếu chưa login thì không gọi API
    if (!loggedIn || !user.id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/users/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        const { success, data, message } = await res.json();

        if (success) {
          setUser(data);
          localStorage.setItem('account', JSON.stringify(data));
        } else {
          toast.error(message || 'Cannot load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('An error occurred while fetching profile');
      }
    };

    fetchProfile();
  }, [loggedIn, user.id]);

  return <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>{children}</LoginContext.Provider>;
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
