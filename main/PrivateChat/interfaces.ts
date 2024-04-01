import type { iTwamessage } from "../Twaroom/dtos";

export interface IPrivateChat {
  userOne: string;
  userTwo: string;
  messages: iTwamessage[];
  isDeleted?: boolean;
}

