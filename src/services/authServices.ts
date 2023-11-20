import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { SignupFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';
import { RegisterSpectatorValuesType, updateRoleValuesType } from '@/types/spectatorTypes';
import { DeleteRoleValuesType, GetAllFilteredValuesType } from '@/types/usersTypes';
import { deleteRoomValuesType } from '@/types/roomsTypes';
import {
  LoginServiceValuesType,
  resetPasswordValuesType,
  sendInviteServiceValuesType,
} from '@/types/formsTypes';
import { RoomData } from '@/Components/pageComponents/auth/authInterfaces';

export const signUpService = async (data: SignupFormValuesType) => {
  const res = await sendRequest(serviceUrls.signup, {
    method: 'POST',
    data,
  });

  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const getAllFilteredUsersListService = async (data: GetAllFilteredValuesType) => {
  const res = await sendRequest(`${serviceUrls.filteredUsersList}${data.searchVal}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const deleteRoleService = async (data: DeleteRoleValuesType) => {
  const res = await sendRequest(`${serviceUrls.deleteRole}${data.userUuid}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const getAllUsersDataService = async (token: string) => {
  const res = await sendRequest(`${serviceUrls.getAllUsers}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const registerSpectatorService = async (data: RegisterSpectatorValuesType) => {
  const res = await sendRequest(`${serviceUrls.registerSpectator}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${data.token}` },
    data: { ...data.formData, role: data.spectatorData[0]?.role?._id },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const updateRoleService = async (data: updateRoleValuesType) => {
  const res = await sendRequest(`${serviceUrls.updateRole}${data?.formData?.role?.userUuid}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${data.token}` },
    data: { role: data.formData?.role?._id },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const getAllRoomsService = async (token: string) => {
  const res = await sendRequest(`${serviceUrls.roomsRelatedUrl}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const deleteRoomService = async (data: deleteRoomValuesType) => {
  const res = await sendRequest(`${serviceUrls.roomsRelatedUrl}/${data._id}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const getAllFilteredRoomsListService = async (data: GetAllFilteredValuesType) => {
  const res = await sendRequest(`${serviceUrls.filteredRoomsList}${data.searchVal}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const updateUserDetailsService = async (data) => {
  console.log('formdatadebug data 4 ==>', data);

  const res = await sendRequest(`${serviceUrls.updateUserDetails}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data.data,
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const sendInviteService = async (data: sendInviteServiceValuesType) => {
  const res = await sendRequest(`${serviceUrls.sendInvite}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${data.token}` },
    data: data.data,
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const forgetPasswordService = async (email: string) => {
  const res = await sendRequest(`${serviceUrls.forgetPassword}`, {
    method: 'POST',
    data: { email },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const loginService = async (data: LoginServiceValuesType) => {
  const res = await sendRequest(`${serviceUrls.login}`, {
    method: 'POST',
    data: { email: data.email, password: data.password },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
  }
};

export const resetPasswordService = async (data: resetPasswordValuesType) => {
  const res = await sendRequest(`${serviceUrls.resetPassword}${data.token}`, {
    method: 'POST',
    data: { newPassword: data.newPassword, confirmPassword: data.confirmPassword },
  });
  if (res.status === 200) {
    return res;
  } else {
    throw res;
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
