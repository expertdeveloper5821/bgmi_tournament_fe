import { CreateRoomFormType } from '@/types/roomsTypes';

export const initialValueCreateRoom: CreateRoomFormType = {
  roomId: '',
  gameName: '',
  gameType: '',
  mapType: '',
  password: '',
  version: '',
  date: '',
  time: '',
  lastSurvival: '',
  thirdWin: '',
  highestKill: '',
  secondWin: '',
  mapImg: '',
  entryFee: '',
};

export const specRoomColumns: string[] = [
  'Room Id',
  'Game Name',
  'Game Type',
  'Map Type',
  'Version',
  'Highest Kill',
  'Last Survival',
  'Third Win',
  'Second Win',
  'Time',
  'Date',
  'Entry Fee',
  'Action',
  'Add Winner',
];
