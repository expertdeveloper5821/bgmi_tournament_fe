'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserContextType, UserInfo } from '@/types/usersTypes';
import { DecodedToken } from './globalfunctions';

const UserContext = createContext<UserContextType>({
  userInfo: null,
  updateUserInfo: () => {},
  updateToken: () => {},
  token: null,
  triggerHandleLogout: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<null | DecodedToken>(null);
  const [timeOutId, setTimeOutId] = useState<null | NodeJS.Timeout>(null);

  const router = useRouter();

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateToken = (token: DecodedToken) => {
    setToken(token);
  };

  const triggerHandleLogout = () => {
    clearTimeout(timeOutId!);
  };

  useEffect(() => {
    const stringifyExpirationTime = localStorage.getItem('expirationTime');
    if (token || stringifyExpirationTime) {
      if (stringifyExpirationTime) {
        const now = new Date().getTime();
        const expirationTime = Number(stringifyExpirationTime);
        const remainingTime = expirationTime - now;
        if (remainingTime) {
          const timeOut: NodeJS.Timeout = setTimeout(() => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('expirationTime');
            router.push('/auth/login');
          }, remainingTime);

          setTimeOutId(timeOut);
        } else {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('expirationTime');
          router.push('/auth/login');
        }
      }
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ userInfo, updateUserInfo, updateToken, token, triggerHandleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const userDetails = useContext(UserContext);
  if (userDetails === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return userDetails;
};
