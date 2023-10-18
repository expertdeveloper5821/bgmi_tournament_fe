import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { SignupFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';
import { RegisterSpectatorValuesType, updateRoleValuesType } from '@/types/spectatorTypes';
import { DeleteRoleValuesType, GetAllFilteredUsersValuesType } from '@/types/usersTypes';
import { deleteRoomValuesType } from '@/types/roomsTypes';

export const signUpService = async (data: SignupFormValuesType) => {
  try {
    const res: any = await sendRequest(serviceUrls.signup, {
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

export const getAllFilteredUsersListService = async (data: GetAllFilteredUsersValuesType) => {
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
