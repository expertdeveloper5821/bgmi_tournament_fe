'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the type for user information
interface UserInfo {
  name: string;
  email: string;
}

// Define the context type
interface UserContextType {
  userInfo: UserInfo | null;
  updateUserInfo: (newUserInfo: UserInfo) => void;
  updateToken: (token: string) => void;
  token: string;
  triggerHandleLogout:() => void;
}

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

  console.log('DEBUGGING 4', userInfo);
  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };

  const updateToken = (token: any) => {
    setToken(token);
  };

  const triggerHandleLogout = () => {
    console.log("triggerHandleLogout timeOutId ==>",timeOutId)
    clearTimeout(timeOutId);
  }

  console.log("GREATCHECK 0 timeOutId",timeOutId)
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

            localStorage.clear();
            router.push('/auth/login');
          }, remainingTime);
          console.log("GREATCHECK 5 timeOutId",timeOut)

          setTimeOutId(timeOut);
        } else {
          localStorage.clear();
          router.push('/auth/login');
        }
      }
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, updateToken, token,triggerHandleLogout }}>
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
