import { Interface } from 'readline';

export interface AuthContainerProps {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
}

export interface SignupFormValuesType {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  upiId: string;
}

export interface RoomData {
  roomId: string;
  _id: string;
  password: string;
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  highestKill: string;
  lastSurvival: string;
  thirdWin: string;
  secondWin: string;
  time: string;
  date: string;
  createdBy: number;
  updatedAt: number;
  createdAt: number;
  entryFee: string;
  mapImg: string;
}
