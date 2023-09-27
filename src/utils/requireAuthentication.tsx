'use client';
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

  useEffect(() => {
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      const redirectToLogin = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/auth/login');
      };

      redirectToLogin();
    }
  }, [router]);

  return <>{children}</>;
};

export default RequireAuthentication;
