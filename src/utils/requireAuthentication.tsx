"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const checkIfUserIsAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    return Boolean(token);
  }
  return false;
};

const RequireAuthentication = (props: any) => {
  const { children } = props;
  const router = useRouter();

  const isAuthenticated = checkIfUserIsAuthenticated();

  if (!isAuthenticated) {
    router.push('/login');
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default RequireAuthentication;
