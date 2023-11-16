import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { SignupFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';
import { RegisterSpectatorValuesType, updateRoleValuesType } from '@/types/spectatorTypes';
import { DeleteRoleValuesType, GetAllFilteredValuesType } from '@/types/usersTypes';
import { deleteRoomValuesType } from '@/types/roomsTypes';
import { RoomData } from '@/Components/pageComponents/auth/authInterfaces';
import { VideoFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';

export const signUpService = async (data: SignupFormValuesType) => {
  try {
    const res = await sendRequest(serviceUrls.signup, {
      method: 'POST',
      data,
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (err) {
    return err;
  }
};

export const videoService = async (payload: VideoFormValuesType, uuid: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, time, ...data } = payload;
    const res = await sendRequest(`${serviceUrls.video}${uuid}`, {
      method: 'POST',
      data,
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (err) {
    return err;
  }
};

export const getAllFilteredUsersListService = async (data: GetAllFilteredValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.filteredUsersList}${data.searchVal}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const deleteRoleService = async (data: DeleteRoleValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.deleteRole}${data.userUuid}`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${data.token}` },
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const getAllUsersDataService = async (token: string) => {
  try {
    const res = await sendRequest(`${serviceUrls.getAllUsers}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const getAllVideo = async (token: string) => {
  try {
    const res = await sendRequest(`${serviceUrls.getAllVideo}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      return res.data.userVideos;
    } else {
      throw new Error('Failed to fetch videos');
    }
  } catch (error) {
    throw new Error('Failed to fetch videos');
  }
};

export const registerSpectatorService = async (data: RegisterSpectatorValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.registerSpectator}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${data.token}` },
      data: { ...data.formData, role: data.spectatorData[0]?.role?._id },
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const updateRoleService = async (data: updateRoleValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.updateRole}${data?.formData?.role?.userUuid}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${data.token}` },
      data: { role: data.formData?.role?._id },
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const getAllRoomsService = async (token: string) => {
  try {
    const res = await sendRequest(`${serviceUrls.roomsRelatedUrl}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const deleteRoomService = async (data: deleteRoomValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.roomsRelatedUrl}/${data._id}`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${data.token}` },
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const getAllFilteredRoomsListService = async (data: GetAllFilteredValuesType) => {
  try {
    const res = await sendRequest(`${serviceUrls.filteredRoomsList}${data.searchVal}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (error) {
    return error;
  }
};

export const getAllSpectator = async (data: RoomData) => {
  try {
    const res = await sendRequest(serviceUrls.rooms, {
      method: 'GET',
      data,
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (err) {
    console.error('Error in roomservice => ', err);
    return err;
  }
};
