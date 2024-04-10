import {defineStore} from "pinia";
import {reactive, ref} from "vue";

import type {iTwaMovie} from "../Movies/interfaces";

import {UserService} from "../User/UserService";
import type {IAllRooms, IPrivateChat, IUserTwaMessageDto} from "./interfaces";
import {
    UsersWebsocketConnectionService,
    type iWebsocket,
} from "../User/UsersWebsocketConnectionService";
import type {iTwamessage} from "../Twaroom/dtos";
import index from "~/pages/index.vue";
import type {IUser} from "~/main/User/interfaces";


export const PrivateChatRepository = defineStore(
    "PrivateChatRepository",
    () => {
        const persistence = reactive({
            all_rooms: {} as IAllRooms,
            selected_room_id: "",
        });
        return {persistence};
    }
);

export class PrivateChatService {
    private persistence: ReturnType<typeof PrivateChatRepository>["persistence"];

    private userService = new UserService();

    constructor() {
        const attach = PrivateChatRepository();
        this.persistence = attach.persistence;
    }

    public get current_room() {
        return this.persistence.all_rooms[this.persistence.selected_room_id];
    }

    public set current_room(room: IPrivateChat) {
        if (!this.persistence.selected_room_id) {
            this.persistence.selected_room_id = room._id;
        }
        this.persistence.all_rooms[this.persistence.selected_room_id] = room;
    }

    public set_current_room_id(id: string) {
        this.persistence.selected_room_id = id;
    }

    public get all_rooms() {
        return this.persistence.all_rooms;
    }

    public receiver_attach() {
        const ws_connection: iWebsocket =
            UsersWebsocketConnectionService().get_connection();

        // ws_connection.off("append_message_private_chat");
        ws_connection.on(
            "append_message_private_chat",
            this.on_append_message.bind(this)
        );
    }

    private on_append_message(room: IPrivateChat) {

        this.persistence.all_rooms[room._id] = room;
    }

    public start_private_chat(users: { requested_user_id: string }) {
        const ws_connection: iWebsocket =
            UsersWebsocketConnectionService().get_connection();
        const dto: Omit<IPrivateChat, "_id"> = {
            users: [this.userService.getTabUserInfo()._id, users.requested_user_id],
            messages: [],
        };

        ws_connection.emit("start_private_chat", dto, (response: IPrivateChat) => {
            navigateTo({path: `/private/chat/${response._id}`, replace: true});
        });
    }

    public enter_private_chat(priv_chat_id: string) {
        const ws_connection: iWebsocket =
            UsersWebsocketConnectionService().get_connection();

        ws_connection.emit(
            "enter_private_chat",
            priv_chat_id,
            (response: IPrivateChat) => {
                this.persistence.all_rooms[response._id] = response;
                this.receiver_attach.bind(this)();
            }
        );
    }

    public send_message_private_chat(user_message: iTwamessage) {
        const ws_connection: iWebsocket =
            UsersWebsocketConnectionService().get_connection();

        ws_connection.emit(
            "send_message_private_chat",
            user_message,
            (response: IPrivateChat) => {
                this.persistence.all_rooms[response._id] = response;
            }
        );
    }

    public async get_enter_all_private_chats() {
        const user = await this.userService.tryGetRealUser();

        if (!user) return;

        const ws_connection: iWebsocket =
            UsersWebsocketConnectionService().get_connection();

        ws_connection.emit(
            "enter_all_private_chats",
            {sender_user_id: user._id},
            (response: IPrivateChat[]) => {

                const mapped_rooms: IAllRooms = {}
                response.reduce((acc, curr, index) => {
                    acc[curr._id] = curr;
                    return acc
                }, mapped_rooms);
                this.persistence.all_rooms = mapped_rooms;
                // this.receiver_attach.bind(this)();
            }
        );
    }

    public get_receiver_user_name_by_room(private_room: IPrivateChat) {
        const current_user = this.userService.getTabUserInfo();
        const other_user = private_room.users.find((user) => {
            return user !== current_user._id
        });
        const msg = private_room.messages.find((msg) => {
            return msg.sender_user_id === other_user
        }) as IUserTwaMessageDto;
        return msg?.sender_user_name
    }


}

