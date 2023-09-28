import { formatDate, formatTime } from '@/Components/CommonComponent/moment';
import { ITournament } from './types';

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

export const NETWORK_ERR_MESSAGE = 'Something went wrong, please try again later!';
export const CONTEST_SUCCESS_MESSAGE = 'Contest Joined Successfully';
export const USER_REGISTERED_MESSAGE = 'Already registered';

//move to utils
export const formatDateAndTime = (
  date: string | Date,
  time: string | Date,
  format: string,
): string => {
  return `${formatDate({ date })} at ${formatTime({ time, format })}`;
};

export const getIdPass = (dateAndTime: string) => {
  const REDUCE_TIME = 15 * 60 * 1000;
  const currentTime = new Date().getTime();
  let dateNumber = new Date(dateAndTime).getTime();
  const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
  return currentTime >= reducedTime;
};