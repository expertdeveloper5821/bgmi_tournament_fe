import { SpectatorDataType, SpectatorsDataType } from './spectatorTypes';

export interface AssignModalPropsType {
  onModalVisibilityHandler: () => void;
  modalData?: SpectatorsDataType[] | [];
  onAssignHandler: (data: SpectatorDataType, roomId: string | undefined) => void;
  roomId?: string | undefined;
}

export interface assignRoleType {
  roomid: string | undefined;
  assignTo: string | undefined;
}
