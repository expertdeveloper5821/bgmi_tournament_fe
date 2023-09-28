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
