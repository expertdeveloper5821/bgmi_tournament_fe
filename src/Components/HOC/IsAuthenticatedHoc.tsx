'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthentication } from '@/utils/checkAuthentication';
import { DecodedToken } from '@/utils/globalfunctions';
import jwt_decode from 'jwt-decode';

function IsAuthenticatedHoc(props) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.split('/')[1] !== 'landingPage') {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      const token = localStorage.getItem('jwtToken')!;
      const decodedToken: DecodedToken = jwt_decode(token);

      if (
        decodedToken?.role?.role === 'user' &&
        !decodedToken?.upiId &&
        !decodedToken?.userName &&
        !decodedToken?.phoneNumber &&
        pathname === '/auth/personaldetails'
      ) {
        return <>{props.children}</>;
      } else if (
        decodedToken?.role?.role === 'user' &&
        decodedToken?.upiId &&
        decodedToken?.userName &&
        decodedToken?.phoneNumber &&
        pathname === '/auth/teamsdetails'
      ) {
        return <>{props.children}</>;
      } else if (decodedToken?.role?.role === 'user' && !pathname.includes('userDashboard')) {
        router.push('/auth/login');
      } else if (decodedToken?.role?.role === 'admin' && !pathname.includes('adminDashboard')) {
        router.push('/auth/login');
      } else if (decodedToken?.role?.role === 'spectator' && !pathname.includes('spectator')) {
        router.push('/auth/login');
      }
    }
  }

  return <>{props.children}</>;
}

export default IsAuthenticatedHoc;
