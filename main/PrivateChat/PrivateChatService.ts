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

const PrivateChatRepository = defineStore("PrivateChatRepository", () => {
  const persistence = reactive({
    current_room: {} as IPrivateChat,
  });
  return { persistence };
});

export class PrivateChatService {
  private persistence: ReturnType<typeof PrivateChatRepository>["persistence"];

  private userService = new UserService();

  constructor() {
    const attach = PrivateChatRepository();
    this.persistence = attach.persistence;
  }
  public get current_room() {
    return this.persistence.current_room;
  }
  public set current_room(room: IPrivateChat) {
    this.persistence.current_room = room;
  }

  public receiver_attach() {
    const ws_connection: iWebsocket =
      UsersWebsocketConnectionService().get_connection();

    ws_connection.on("append_message_private_chat", this.on_append_message);
  }

  private on_append_message(room: IPrivateChat) {
    this.current_room = room;
  }

  public start_private_chat(users: { requested_user_id: string }) {
    const ws_connection: iWebsocket =
      UsersWebsocketConnectionService().get_connection();
    const dto: Omit<IPrivateChat, "_id"> = {
      users: [this.userService.getTabUserInfo()._id, users.requested_user_id],
      messages: [],
    };

    ws_connection.emit("start_private_chat", dto, (response: IPrivateChat) => {
      console.log("~☠️ ~ start_private_chat:", response);
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
        console.log("~☠️ ~ enter_private_chat:", response);
        this.current_room = response;
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
        console.log("~☠️ ~ send_message_private_chat:", response);
        this.current_room = response;
      }
    );
  }
}

