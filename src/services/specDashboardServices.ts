import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { toast } from 'react-toastify';
import { getItemFromLS } from '@/utils/globalfunctions';
const roomUuid = getItemFromLS('roomUuid') || '';
const roomID = getItemFromLS('roomId');

export const getAllSpectatorService = async (setSpect) => {
  const spectatorResponse = await sendRequest('room/user-rooms');
  setSpect(spectatorResponse?.data);
  if (spectatorResponse.status !== 200) {
    toast.error('Something went wrong, Try again');
  }
};

export const getAllTeamsService = async (setRoomUsers) => {
  try {
    const roomTeamsGet = await sendRequest(`${serviceUrls.getRoomTeams}${roomID}`);
    setRoomUsers(roomTeamsGet?.data?.teams);
  } catch (error) {
    console.log('Error in get team data', error);
  }
};

export const getWinningTeamsService = async (setWinnnerTeamData) => {
  try {
    const winnerTeamsResult = await sendRequest(`${serviceUrls.winnerGetPlayer}${roomUuid}`);
    setWinnnerTeamData(winnerTeamsResult?.data);
  } catch (error) {
    console.log('Error in get team data', error);
  }
};

export const handleSubmitWinningTeamService = async (
  setIsLoading,
  winnnerTeamData,
  formData,
  router,
) => {
  setIsLoading(true);
  try {
    const response = await sendRequest(`${serviceUrls.winnerPlayerUpdate}${roomUuid}`, {
      method: `${winnnerTeamData ? 'PUT' : 'POST'}`,
      data: Object.values(formData),
    });
    toast.success('Winning team update successfully');
    router.push('/spectatorDashboard');
    if (response.status !== 200) {
      toast.error('Fail to update Winning team data !');
    }
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};
