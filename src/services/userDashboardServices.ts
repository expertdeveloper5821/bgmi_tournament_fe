import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { IJoinMatchPayload } from '@/redux/types';

export const getAllRoomsService = async () => {
  return await sendRequest(serviceUrls.allRooms, {
    method: 'GET',
  });
};

export const getRegRoomsService = async () => {
  return await sendRequest(serviceUrls.regRooms, {
    method: 'GET',
  });
};

export const joinMatchService = async (data: IJoinMatchPayload) => {
  return await sendRequest(serviceUrls.joinMatch, {
    method: 'POST',
    data,
  });
};

export const getMatchDetailsService = async (matchID: string) => {
  return await sendRequest(`${serviceUrls.allRooms}/${matchID}`, {
    method: 'GET',
  });
};
