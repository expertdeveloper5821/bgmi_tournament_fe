import { SpectatorDataType } from './spectatorTypes';

export interface AssignModalPropsType {
  onModalVisibilityHandler: () => void;
  modalData?: SpectatorDataType[] | [];
  onAssignHandler: (data: SpectatorDataType) => void;
}

export interface assignRoleType {
  roomid: string | undefined;
  assignTo: string | undefined;
}
