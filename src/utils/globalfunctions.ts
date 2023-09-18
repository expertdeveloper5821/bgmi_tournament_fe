import jwt_decode from 'jwt-decode';

const decodeJWt = (token: string): void => {
  if (token) {
    return jwt_decode(token);
  } else {
    return;
  }
};

const getTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    return token;
  }
};

export { decodeJWt, getTokenFromLS };
