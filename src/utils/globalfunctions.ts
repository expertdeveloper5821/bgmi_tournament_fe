import jwt_decode from 'jwt-decode';

interface userInfo {
  fullName: string;
  teamName: string;
  userId: string;
  userUuid: string;
  email: string;
}
const decodeJWt = (token: string): userInfo | null => {
  if (token) {
    return jwt_decode(token);
  }
};

const getTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    return token;
  }
};

export { decodeJWt, getTokenFromLS };
