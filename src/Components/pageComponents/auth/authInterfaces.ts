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

export interface AuthContainerProps {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  subTitle?: string;
}

export interface SignupFormValuesType {
  fullName: string;
  email: string;
  password: string;
}

export interface onbStepType {
  id: number;
  title: string;
  subTitle: string;
}
export interface details {
  player: string;
  upi: string;
  whatsapp: string;
}

export interface VideoFormValuesType {
  title: string;
  videoLink: string;
  dateAndTime: string | Date;
  date: string;
  time: string;
  mapImg: string;
}
