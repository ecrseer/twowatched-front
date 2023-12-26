import { defineStore } from "pinia";
import type { iTwaroom } from "../../singleton-stores/dtos";
import { MoviesRepository } from "../Movies/MoviesRepository";
import type { iTwaMovie } from "../Movies/interfaces";
import { WebsocketConnectionService } from "./WebsocketConnectionService";
import { config } from "@vue/test-utils";

export interface iEnterRoleplayRoomDto {
  moviesList: iTwaMovie[];
}
export const NotificationService = defineStore("NotificationService", () => {
  const moviesRepository = MoviesRepository();

  // const configs = useRuntimeConfig();

  const current_room = ref<null | iTwaroom>(null);

  async function enter_roleplay_notifications_room() {
    const moviesList = moviesRepository.getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection = get_connection();
    const dto: iEnterRoleplayRoomDto = {
      moviesList,
    };

    ws_connection.emit("enter_roleplay_notifications_room", dto);
    ws_connection.on("wants_movie_roleplay", (dto, more, than) => {
      console.log("🚀 ~ wants_movie_roleplay.on ~ dto:", {
        dto,
        more,
        than,
        ws_connection,
      });
    });
  }
  async function handle_roleplay_chat_request(priority: iTwaMovie) {
    const moviesList = moviesRepository.getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection = get_connection();
    ws_connection.emit("request_roleplay_chat", { priority, moviesList });
  }

  return { handle_roleplay_chat_request, enter_roleplay_notifications_room };
});

