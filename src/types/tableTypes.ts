import { Role, SpectatorEditDataType } from './spectatorTypes';

export interface TableDataType {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  profilePic?: string;
  role?: Role;
  upiId?: string;
  userName?: string;
  userUuid?: string;
  availableSlots?: number;
  createdAt?: string;
  createdBy?: string;
  dateAndTime?: string;
  entryFee?: string;
  gameName?: string;
  gameType?: string;
  highestKill?: string;
  lastSurvival?: string;
  mapImg?: string;
  mapType?: string;
  password?: string;
  registerTeams?: [];
  roomId?: string;
  roomUuid?: string;
  secondWin?: string;
  thirdWin?: string;
  updatedAt?: string;
  version?: string;
  __v?: number;
  _id?: string;
}

export interface TablePropsType {
  data?: TableDataType[];
  columns?: string[];
  deleteroom?: (_id: string | undefined) => void;
  type?: string;
  handleEdit?: (spectatorData: SpectatorEditDataType) => void;
}
