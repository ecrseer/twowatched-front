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
  const { $io } = useNuxtApp();
  const configs = useRuntimeConfig();

  const current_room = ref<null | iTwaroom>(null);

  async function enter_roleplay_notifications_room() {
    const moviesList = moviesRepository.getMovies();
    // const { ws_connection } = WebsocketConnectionService();
    const ws_connection = $io(configs.public.BACKEND_URI);
    const dto: iEnterRoleplayRoomDto = {
      moviesList,
    };

    console.log(
      "🚀 ~ enter_roleplay_notifications_room ~ ws_connection:",
      ws_connection
    );
    ws_connection?.emit("enter_roleplay_notifications_room", dto);
    ws_connection.on("wants_movie_roleplay", (dto) => {
      console.log("🚀 ~ wants_movie_roleplay.on ~ dto:", dto);
    });
  }
  async function handle_roleplay_chat_request(priority: iTwaMovie) {
    const moviesList = moviesRepository.getMovies();
    const ws_connection = $io(configs.public.BACKEND_URI);
    ws_connection.emit("request_roleplay_chat", { priority, moviesList });
  }

  return { handle_roleplay_chat_request, enter_roleplay_notifications_room };
});

