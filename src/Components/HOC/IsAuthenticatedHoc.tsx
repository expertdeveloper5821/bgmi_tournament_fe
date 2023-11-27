'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkAuthentication } from '@/utils/checkAuthentication';
import { DecodedToken } from '@/utils/globalfunctions';
import jwt_decode from 'jwt-decode';

function IsAuthenticatedHoc(props) {
  const router = useRouter();
  const pathname = usePathname();
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [prevurl, setPrevUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prevurl_ = window?.localStorage?.getItem('prevurl');
      setPrevUrl(prevurl_ ? prevurl_ : '');

      if (pathname.split('/')[1] !== 'landingPage') {
        const isAuthenticated = checkAuthentication();
        if (!isAuthenticated) {
          router.push('/auth/login');
        } else {
          const token = window?.localStorage?.getItem('jwtToken') || '';
          setDecodedToken(jwt_decode(token));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (
      decodedToken?.role?.role === 'user' &&
      !decodedToken?.upiId &&
      !decodedToken?.userName &&
      !decodedToken?.phoneNumber &&
      pathname === '/auth/personaldetails'
    ) {
      // return <>{props.children}</>;
    } else if (
      decodedToken?.role?.role === 'user' &&
      decodedToken?.upiId &&
      decodedToken?.userName &&
      decodedToken?.phoneNumber &&
      pathname === '/auth/teamsdetails' &&
      prevurl === 'personaldetails'
    ) {
      // return <>{props.children}</>;
    } else if (
      decodedToken?.role?.role === 'spectator' &&
      pathname === '/adminDashboard/spectator'
    ) {
      router.push('/auth/login');
    } else if (decodedToken?.role?.role === 'user' && !pathname.includes('userDashboard')) {
      router.push('/auth/login');
    } else if (decodedToken?.role?.role === 'admin' && !pathname.includes('adminDashboard')) {
      router.push('/auth/login');
    } else if (decodedToken?.role?.role === 'spectator' && !pathname.includes('spectator')) {
      router.push('/auth/login');
    }
  }, [decodedToken]);

  return <>{props.children}</>;
}

export default IsAuthenticatedHoc;
