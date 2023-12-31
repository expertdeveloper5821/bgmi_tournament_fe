export interface RoomsDataType {
  availableSlots: number;
  createdAt: string;
  createdBy: {
    _id: string;
    fullName: string;
  };
  updatedBy: {
    fullName: string;
    _id: string;
  };
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
  matchType: string;
  __v: number;
  _id: string;
}

export interface deleteRoomValuesType {
  _id: string;
}

// export interface deleteVideoValuesType {
//   _id: string;
//   token: string;
// }

export interface CreateRoomFormType {
  roomId: string;
  gameName: string;
  gameType: string;
  mapType: string;
  password: string;
  version: string;
  date: string;
  time: string;
  lastSurvival: string;
  thirdWin: string;
  highestKill: string;
  secondWin: string;
  entryFee: string;
  mapImg: string | null;
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

export interface winnerFormDataType {
  [key: string]: winnerFormType;
}

export interface winnerFormType {
  teamName: string;
  chickenDinner: number;
  highestKill: number;
  firstWinner: number;
  secondWinner: number;
}

interface Leader {
  fullName: string;
  profilePic: string;
}
interface Team {
  leader: Leader;
  prizeTitles: string[];
  teamMembers: Leader[];
  teamName: string;
}

export interface GameRoomType {
  room: {
    gameName: string;
    gameType: string;
    mapType: string;
    dateAndTime: string;
  };
  roomId: string;
  teams: Array<Team>;
  winnerUuid: string;
}
export interface ROLES_DETAILS_TYPE {
  _id: string;
  role: string;
  uuid: string;
}
