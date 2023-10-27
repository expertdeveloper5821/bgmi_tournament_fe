'use client';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { checkAuthentication } from './checkAuthentication';
import { UserContextType, UserInfo } from '@/types/usersTypes';

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
  const [token, setToken] = useState<any>(null);
  const [timeOutId, setTimeOutId] = useState<any>(null);

  const router = useRouter();

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    console.log('window ==>', window.location, 'pathname', pathname);

    if (!pathname.includes('landingPage')) {
      const isAuthenticated = checkAuthentication();
      if (!isAuthenticated) {
        if (pathname === '/auth/signup') {
          console.log('DEBUGGINGGGGG');
          router.push('/auth/signup');
        } else if (pathname === '/auth/reset-password') {
          router.push('/auth/reset-password');
        } else if (pathname === '/auth/forget-password') {
          router.push('/auth/forget-password');
        } else {
          router.push('/auth/login');
        }
      } else {
        const token = localStorage.getItem('jwtToken');
        const decodedToken: any = jwt_decode(token);
        console.log('decodedToken ==>', decodedToken);
        if (
          decodedToken?.role?.role !== 'user' &&
          (pathname === '/auth/personaldetails' || pathname === '/auth/teamsdetails')
        ) {
          console.log('inside decodedToken?.role?.role', decodedToken);
          router.push('/auth/login');
        }
      }
    }
  }

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateToken = (token: any) => {
    setToken(token);
  };

  const triggerHandleLogout = () => {
    console.log('triggerHandleLogout timeOutId ==>', timeOutId);
    clearTimeout(timeOutId);
  };

  useEffect(() => {
    const stringifyExpirationTime = localStorage.getItem('expirationTime');
    console.log(
      'GREATCHECK 1 tokenssss ==>',
      token,
      'stringifyExpirationTime',
      stringifyExpirationTime,
    );
    if (token || stringifyExpirationTime) {
      console.log('GREATCHECK 1.1 stringifyExpirationTime', stringifyExpirationTime);
      if (stringifyExpirationTime) {
        const now = new Date().getTime();
        const expirationTime = Number(stringifyExpirationTime);
        console.log('GREATCHECK 2 expirationTime, now', expirationTime, now);
        const remainingTime = expirationTime - now;
        if (remainingTime) {
          console.log('GREATCHECK 3 deep inside remainingTime ==>', remainingTime);
          const timeOut = setTimeout(() => {
            console.log('GREATCHECK 4 deep inside remainingTime ==>', remainingTime);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('expirationTime');
            router.push('/auth/login');
          }, remainingTime);
          console.log('GREATCHECK 5 timeOutId', timeOut);

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
