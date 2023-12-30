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
import { NotificationService } from "../Notifications/NotificationService";
import type { iTwaMovie } from "../Movies/interfaces";

const TwaroomRepository = defineStore("TwaroomRepository", () => {
  const persistence = reactive({});
  return { persistence };
});

export class TwaroomService {
  private persistence: ReturnType<typeof TwaroomRepository>["persistence"];
  private moviesService = MoviesService();
  constructor() {
    const attach = TwaroomRepository();
    this.persistence = attach.persistence;
  }

  public async enter_roleplay_notifications_room() {
    const moviesList = this.moviesService.getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection: iWebsocket = get_connection();
    const dto: iEnterRoleplayRoomDto = {
      moviesList,
    };
    ws_connection.emit("enter_roleplay_notifications_room", dto);
    this.enable_roleplay_listeners(ws_connection);
  }

  private async enable_roleplay_listeners(ws_connection: iWebsocket) {
    ws_connection.on("wants_movie_roleplay", (notification: iNotification) => {
      const notify_service = new NotificationService();
      notify_service.add_fading_notification({ ...notification });
    });
  }

  public handle_roleplay_chat_request(priority: iTwaMovie) {
    const { get_connection } = WebsocketConnectionService();
    const ws_connection = get_connection();

    const moviesList = this.moviesService.getMovies();
    ws_connection.emit("request_roleplay_chat", { priority, moviesList });
  }
}

