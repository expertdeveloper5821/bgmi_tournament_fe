'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for user information
interface UserInfo {
  name: string;
  email: string;
}

// Define the context type
interface UserContextType {
  userInfo: UserInfo | null;
  updateUserInfo: (newUserInfo: UserInfo) => void;
}

// Create the context
const UserContext = createContext<UserContextType>({
  userInfo: null,
  updateUserInfo: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };
  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const userDetails = useContext(UserContext);
  if (userDetails === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return userDetails;
};
