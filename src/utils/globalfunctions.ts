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
  phoneNumber?: string;
  profilePic?: string;
  upiId?: string;
}

export interface VerifiedToken {
  exp: number;
  iat: number;
  user?: {
    email: string;
    fullName: string;
    isOnline: boolean;
    provider: string;
    userName: string;
    userUuid: string;
    role: {
      role: string;
      uuid: string;
      __v: number;
      _id: string;
    };
    upiId?: string;
    phoneNumber?: string;
    __v: number;
    _id: string;
  };
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
