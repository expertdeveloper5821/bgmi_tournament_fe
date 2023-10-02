import { ITournament, IUserDashboard } from './types';

export const initialValues: ITournament = {
  gameName: '',
  mapType: '',
  gameType: '',
  version: '',
  roomUuid: '',
  dateAndTime: '',
  lastSurvival: '',
  roomId: '',
  mapImg: '',
  entryFee: '',
  highestKill: '',
  secondWin: '',
  thirdWin: '',
};

export const matchDataInitialState = {
  gameName: '',
  gameType: '',
  mapType: '',
  version: '',
  dateAndTime: '',
  lastSurvival: '',
  roomId: '',
  roomUuid: '',
  password: '',
  entryFee: '',
  mapImg: '',
  highestKill: '',
  secondWin: '',
  thirdWin: '',
};

export const userDashboardinitialState: IUserDashboard = {
  allRooms: [],
  allRoomsLoading: false,
  allRoomsError: null,
  regRooms: [],
  regRoomsLoading: false,
  regRoomsError: null,
  joinMatchLoading: false,
  joinMatchMessage: null,
  joinMatchError: null,
  matchData: matchDataInitialState,
  matchDataLoading: false,
  matchDataError: null,
  selectedMatch: initialValues,
};
