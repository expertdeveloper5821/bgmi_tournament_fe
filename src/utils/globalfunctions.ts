import jwt_decode from 'jwt-decode';
export const decodeJWt = (token: string): void => {
  if (token) {
    return jwt_decode(token);
  } else {
    return;
  }
};
