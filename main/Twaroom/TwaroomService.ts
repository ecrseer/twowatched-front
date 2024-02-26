import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {
  MoviesService,
  type iEnterRoleplayRoomDto,
} from "../Movies/MoviesService";
import {
  WebsocketConnectionService,
  type iWebsocket,
} from "./WebsocketConnectionService";
import {
  NotificationService,
  type iNotification,
} from "../Notifications/NotificationService";
import type { iTwaMovie } from "../Movies/interfaces";
import type { iTwamessage, iTwaroom } from "./dtos";
import { TwaroomReceiverService } from "./TwaroomReceiverService";

const TwaroomRepository = defineStore("TwaroomRepository", () => {
  const persistence = reactive({
    current_room: {} as iTwaroom,
  });
  return { persistence };
});

export class TwaroomService {
  private persistence: ReturnType<typeof TwaroomRepository>["persistence"];
  private moviesService = MoviesService();
  private receiver = new TwaroomReceiverService();

  constructor() {
    const attach = TwaroomRepository();
    this.persistence = attach.persistence;
  }
  public get current_room() {
    return this.persistence.current_room;
  }
  public send_roleplay_chat_request(priority: iTwaMovie) {
    const { get_connection } = WebsocketConnectionService();
    const ws_connection = get_connection();

    const moviesList = this.moviesService.getMovies();
    ws_connection.emit("request_roleplay_chat", { priority, moviesList });
  }

  public async enter_roleplay_notifications_room() {
    const moviesList = this.moviesService.getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection: iWebsocket = get_connection();
    const dto: iEnterRoleplayRoomDto = {
      moviesList,
    };
    ws_connection.emit("enter_roleplay_notifications_room", dto);
    this.receiver.attach();
  }

  public async enter_room(user: { room_id: string; sender_user_id: string }) {
    const { room_id, sender_user_id } = user;
    const config = useRuntimeConfig();
    try {
      const room = await $fetch<iTwaroom>(
        `${config.public.BACKEND_URI}/twaroom/${room_id}`,
        {
          method: "GET",
        }
      );
      this.persistence.current_room = room;

      const { get_connection } = WebsocketConnectionService();
      const ws_connection: iWebsocket = get_connection();
      ws_connection.emit("enter_room", { room_id, sender_user_id });

      return room;
    } catch (err) {
      console.error(err);
    }
  }
  public send_message_to_room(user_message: iTwamessage) {
    const { get_connection } = WebsocketConnectionService();
    const ws_connection: iWebsocket = get_connection();
    this.append_message_to_current_room(user_message);
    ws_connection.emit("send_message", user_message);
  }
  public append_message_to_current_room(message: iTwamessage) {
    this.persistence.current_room.messages.push(message);
  }
}

