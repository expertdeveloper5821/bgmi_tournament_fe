import jwt_decode from 'jwt-decode';

export interface DecodedToken {
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  role: {
    _id: number;
    role: string;
    __v?: number;
    uuid?: string;
  };
  teamName: null;
  userId: string;
  userName: string;
  userUuid: string;
  phoneNumber?: string;
  profilePic?: string;
  upiId?: string;
}

const decodeJWt = (token: string): DecodedToken | null => {
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

const getTokenFromLS = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtToken');
    return token;
  }
};

export { decodeJWt, getTokenFromLS };
