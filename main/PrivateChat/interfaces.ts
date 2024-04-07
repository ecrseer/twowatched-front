import type {iTwamessage} from "../Twaroom/dtos";

export interface IPrivateChat {
    _id: string;
    users: string[];
    messages: iTwamessage[];
    isDeleted?: boolean;
}

export type IAllRooms = Record<string, IPrivateChat>


export interface IUserTwaMessageDto extends iTwamessage {
    sender_user_name: string;
}
