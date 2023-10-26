export interface RoomsDataType {
  availableSlots: number;
  createdAt: string;
  createdBy: string;
  dateAndTime: string;
  entryFee: string;
  gameName: string;
  gameType: string;
  highestKill: string;
  lastSurvival: string;
  mapImg: string;
  mapType: string;
  password: string;
  registerTeams: [];
  roomId: string;
  roomUuid: string;
  secondWin: string;
  thirdWin: string;
  updatedAt: string;
  version: string;
  __v: number;
  _id: string;
}

export interface deleteRoomValuesType {
  _id: string;
  token: string;
}
