export interface DecodedTokenType {
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
  userName?: string;
  userUuid: string;
  phoneNumber?: string;
  profilePic?: string | null | undefined;
  upiId?: string;
}
