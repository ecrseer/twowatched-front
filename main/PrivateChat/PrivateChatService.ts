import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import type { iTwaMovie } from "../Movies/interfaces";

import { UserService } from "../User/UserService";
import type { IPrivateChat } from "./interfaces";
import {
  UsersWebsocketConnectionService,
  type iWebsocket,
} from "../User/UsersWebsocketConnectionService";

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

  public start_private_chat(users: { requested_user_id: string }) {
    const ws_connection: iWebsocket =
      UsersWebsocketConnectionService().get_connection();
    const dto: IPrivateChat = {
      userOne: this.userService.getTabUserInfo()._id,
      userTwo: users.requested_user_id,
      messages: [],
    };

    ws_connection.emit("start_private_chat", dto, (response: IPrivateChat) => {
      alert("criou pv");
      console.log(
        "~☠️ ~ PrivateChatService ~ ws_connection.emit ~ response:",
        response
      );
    });
  }
}

