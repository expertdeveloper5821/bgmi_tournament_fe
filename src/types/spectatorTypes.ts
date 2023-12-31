export interface Role {
  _id: string;
  role: string;
}

export interface RoleType {
  role: string;
  userUuid: string | undefined;
  _id: string | undefined;
}
export interface FormDataType {
  fullName?: string;
  userName?: string;
  email?: string;
  password?: string;
  role?: RoleType;
}

export interface SpectatorDataType {
  email?: string;
  fullName?: string;
  userName?: string;
  userUuid?: string;
  matchType?: string;
  phoneNumber?: string;
  profilePic?: string;
  role?: Role;
  upiId?: string;
}

export interface ModalType {
  isOpen: boolean;
  buttonVal: string;
}

export interface SpectatorEditDataType {
  matchType?: string;
  email?: string;
  fullName?: string;
  role?: Role;
  userName?: string;
  userUuid?: string;
}

export interface RegisterSpectatorValuesType {
  token: string;
  formData: FormDataType;
  id: string | undefined;
}

export interface updateRoleValuesType {
  formData: FormDataType;
  token: string;
}

export interface FormValues {
  title: string;
  videoLink: string;
  dateAndTime: string;
}

export interface getVideo {
  title?: string;
  mapImg?: string;
  dateAndTime?: string;
  _id?: string;
}

export interface adminGetVideo {
  matchType: string;
  title: string;
  mapImg: string;
  dateAndTime: string;
  roomId: string;
  videoLink: string;
  _id: string;
}

export interface deleteVideoValuesType {
  _id: string;
  token: string;
}

export interface SpectatorsDataType {
  email: string;
  fullName: string;
  role: { _id: string; role: string };
  _id: string;
}
