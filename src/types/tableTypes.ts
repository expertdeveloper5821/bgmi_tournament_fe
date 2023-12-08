import { Role, SpectatorEditDataType, getVideo } from './spectatorTypes';

export interface TableDataType {
  matchType?: string;
  videoLink?: string;
  title?: string;
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
  createdBy?:
    | {
        fullName?: string;
      }
    | string;
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
  teamName?: string;
  totalLosses?: number;
  totalPoints?: number;
  totalWins?: number;
}

export interface TablePropsType {
  data?: TableDataType[];
  columns?: string[];
  deleteroom?: (_id: string | undefined) => void;
  popupid?: (_id: string | undefined) => void;
  type?: string;
  handleEdit?: (spectatorData: SpectatorEditDataType) => void;
  handleUpdate?: (videoData: getVideo) => void;
}
