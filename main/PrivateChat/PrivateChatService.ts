import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import type { iTwaMovie } from "../Movies/interfaces";

import { UserService } from "../User/UserService";
import type { IPrivateChat } from "./interfaces";
import {
  UsersWebsocketConnectionService,
  type iWebsocket,
} from "../User/UsersWebsocketConnectionService";
import type { iTwamessage } from "../Twaroom/dtos";

export const PrivateChatRepository = defineStore(
  "PrivateChatRepository",
  () => {
    const persistence = reactive({
      all_rooms: {} as Record<string, IPrivateChat>,
      selected_room_id: "",
    });
    return { persistence };
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
    console.log("~☠️ ~ PrivateChatService ~ on_append_message ~ room:", room);
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
      navigateTo({ path: `/private/chat/${response._id}`, replace: true });
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
}

