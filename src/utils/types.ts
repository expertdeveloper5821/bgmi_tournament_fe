export interface IConfig {
  api: Record<string, string>;
  web: Record<string, string>;
  paymentID: string;
}

export interface SpectatorRoomDataType {
  dateAndTime: string;
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
