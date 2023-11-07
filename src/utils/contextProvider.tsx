'use client';
import { usePathname, useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { checkAuthentication } from './checkAuthentication';
import { UserContextType, UserInfo } from '@/types/usersTypes';
import { DecodedToken } from './globalfunctions';

// Create the context
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
  const pathname = usePathname();

  if (typeof window !== 'undefined') {
    if (!pathname.includes('landingPage')) {
      const isAuthenticated = checkAuthentication();
      if (!isAuthenticated) {
        if (pathname === '/auth/signup') {
          router.push('/auth/signup');
        } else if (pathname === '/auth/reset-password') {
          router.push('/auth/reset-password');
        } else if (pathname === '/auth/forget-password') {
          router.push('/auth/forget-password');
        } else if (pathname === '/auth/mailpage') {
          router.push('/auth/mailpage');
        } else if (pathname === '/auth/updateCredSuccess') {
          router.push('/auth/updateCredSuccess');
        }
      } else {
        const token = localStorage.getItem('jwtToken');
        const decodedToken: DecodedToken = jwt_decode(token);
        if (
          decodedToken?.role?.role !== 'user' &&
          (pathname === '/auth/personaldetails' || pathname === '/auth/teamsdetails')
        ) {
          router.push('/auth/login');
        } else if (
          decodedToken?.role?.role === 'admin' &&
          !pathname.includes('adminDashboard') &&
          (pathname.split('/')[1] === 'userDashboard' ||
            pathname.split('/')[1] === 'spectatorDashboard')
        ) {
          router.push('/adminDashboard/room');
        } else if (
          decodedToken?.role?.role === 'user' &&
          decodedToken?.upiId &&
          decodedToken?.userName &&
          decodedToken?.phoneNumber &&
          !pathname.includes('userDashboard') &&
          !pathname.includes('personaldetails') &&
          !pathname.includes('teamsdetails') &&
          (pathname.split('/')[1] === 'adminDashboard' ||
            pathname.split('/')[1] === 'spectatorDashboard')
        ) {
          router.push('/userDashboard');
        } else if (
          decodedToken?.role?.role === 'spectator' &&
          !pathname.includes('spectatorDashboard') &&
          (pathname.split('/')[1] === 'adminDashboard' ||
            pathname.split('/')[1] === 'userDashboard')
        ) {
          router.push('/spectatorDashboard');
        }
      }
    }
  }

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateToken = (token: DecodedToken) => {
    setToken(token);
  };

  const triggerHandleLogout = () => {
    clearTimeout(timeOutId);
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
