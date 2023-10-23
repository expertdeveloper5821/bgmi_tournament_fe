'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const checkIfUserIsAuthenticated = () => {
  console.log("checkIfUserIsAuthenticated window 1 ===>",window)

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    console.log("checkIfUserIsAuthenticated token 2 ===>",token)
    return Boolean(token);
  }
  return false;
};

const RequireAuthentication = (props: any) => {
  const { children } = props;
  const router = useRouter();

  console.log("checkIfUserIsAuthenticated isAuthenticated 0 ===>")
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
