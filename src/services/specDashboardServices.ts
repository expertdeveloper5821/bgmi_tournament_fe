import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';

export const getAllSpectatorService = async () => {
  const response = await sendRequest(serviceUrls.getAllRoom);
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export const getAllTeamsService = async (roomID) => {
  const response = await sendRequest(`${serviceUrls.getRoomTeams}${roomID}`);
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export const getWinningTeamsService = async (roomUuid) => {
  const response = await sendRequest(`${serviceUrls.winnerGetPlayer}${roomUuid}`);
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export const handleSubmitWinningTeamService = async (formData, winnnerTeamData, roomUuid) => {
  const response = await sendRequest(`${serviceUrls.winnerPlayerUpdate}${roomUuid}`, {
    method: `${winnnerTeamData ? 'PUT' : 'POST'}`,
    data: Object.values(formData),
  });
  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
};
