export interface IRegRoomsResponse {
  message: string;
  rooms: [ITournament] | [];
  numberOfRooms: number;
}

export interface ITournament {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  dateAndTime: string;
  roomId: string;
  lastSurvival: string;
  roomUuid: string;
  mapImg: string;
  entryFee?: string;
  highestKill: string;
  secondWin: string;
  thirdWin: string;
  _id?: string;
  password?: string;
}

export interface IMatchProps {
  match: ITournament;
}

export interface IMatchData {
  gameName: string;
  gameType: string;
  mapType: string;
  version: string;
  dateAndTime: string;
  lastSurvival: string;
  roomId: string;
  roomUuid: string;
  password: string;
  entryFee?: string;
  mapImg: string;
  highestKill: string;
  secondWin: string;
  thirdWin: string;
}

export interface IUserDashboard {
  allRooms: [ITournament] | [];
  allRoomsLoading: boolean;
  allRoomsError: null | string;
  regRooms: [ITournament] | [];
  regRoomsLoading: boolean;
  regRoomsError: string | unknown;
  joinMatchLoading: boolean;
  joinMatchError: null | string;
  matchData: IMatchData | Record<string, string>;
  matchDataLoading: boolean;
  matchDataError: string | null;
  selectedMatch: ITournament;
}

export interface IJoinMatchPayload {
  upiId: string;
  matchAmount: number;
  name: string;
  id: string;
  roomid: string;
}
