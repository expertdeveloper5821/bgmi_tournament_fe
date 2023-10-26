import { DecodedToken } from '@/app/auth/login/page';
import jwt_decode from 'jwt-decode';

const decodeJWt = (token: string): DecodedToken => {
    return jwt_decode(token);
};

const getTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    return token;
  }
};

export { decodeJWt, getTokenFromLS };
