import { DecodedToken } from "@/utils/globalfunctions";

export interface GetAllFilteredValuesType {
  searchVal: string;
  token: string;
}

export interface DeleteRoleValuesType {
  userUuid: string;
  token: string;
}

export interface UserInfo {
  name: string;
  email: string;
}
export interface UserContextType {
  userInfo: UserInfo | null;
  updateUserInfo: (newUserInfo: UserInfo) => void;
  updateToken: (token: DecodedToken) => void;
  token: null | DecodedToken;
  triggerHandleLogout: () => void;
}
