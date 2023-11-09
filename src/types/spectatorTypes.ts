export interface Role {
  _id: string;
  role: string;
}

export interface RoleType {
  role: string;
  userUuid: string;
  _id: string;
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
  phoneNumber?: string;
  profilePic?: string;
  role?: Role;
  upiId?: string;
  userName?: string;
  userUuid?: string;
}

export interface ModalType {
  isOpen: boolean;
  buttonVal: string;
}

export interface SpectatorEditDataType {
  email?: string;
  fullName?: string;
  role?: Role;
  userName?: string;
  userUuid?: string;
}

export interface RegisterSpectatorValuesType {
  token: string;
  formData: FormDataType;
  spectatorData: SpectatorDataType[] | [];
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
