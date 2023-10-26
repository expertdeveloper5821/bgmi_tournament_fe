import jwt_decode from 'jwt-decode';

export interface DecodedToken {
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  role: {
    _id: number;
    role: string;
  };
  teamName: null;
  userId: string;
  userName: string;
  userUuid: string;
}

const decodeJWt = (token: string): DecodedToken | null => {
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
