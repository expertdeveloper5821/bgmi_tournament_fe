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

const setItemToLS = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
};

const getItemFromLS = (name: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(name);
  }
};

export { decodeJWt, getTokenFromLS, setItemToLS, getItemFromLS };
