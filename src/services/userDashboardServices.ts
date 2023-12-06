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

export const deleteFriendService = async (userMail) => {
  const response = await sendRequest(serviceUrls.deletefriend, {
    method: 'DELETE',
    data: {
      teammateEmail: userMail,
    },
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export const sendEmailInviteService = async (payload) => {
  const response = await sendRequest(serviceUrls.inviteMail, {
    method: 'POST',
    data: payload,
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export async function globalSearchService(query) {
  const response = await sendRequest(`${serviceUrls.globalusers}?search=${query}`, {
    method: 'GET',
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
}

export async function fetchFriendsService(query) {
  const response = await sendRequest(`${serviceUrls.getAllFriends}?search=${query}`, {
    method: 'GET',
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
}

export async function getAllWinnerService() {
  const response = await sendRequest(`${serviceUrls.getAllWinnder}`, {
    method: 'GET',
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
}
