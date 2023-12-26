import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTwaMovie } from "./interfaces";
import {
  WebsocketConnectionService,
  type iWebsocket,
} from "../Twaroom/WebsocketConnectionService";
export interface iEnterRoleplayRoomDto {
  moviesList: iTwaMovie[];
}

export const MoviesService = defineStore("MoviesService", () => {
  const moviesList = ref<iTwaMovie[]>([{ name: "Demon slayer" }]);
  const currentSearchedMovieImage = ref("");

  function addToMoviesList(movie: iTwaMovie): iTwaMovie[] {
    moviesList.value.push(movie);
    return moviesList.value;
  }
  function getMovies() {
    return moviesList.value;
  }

  async function enter_roleplay_notifications_room() {
    const moviesList = getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection: iWebsocket = get_connection();
    const dto: iEnterRoleplayRoomDto = {
      moviesList,
    };

    ws_connection.emit("enter_roleplay_notifications_room", dto);
    enable_roleplay_notifications_room_listeners(ws_connection);
  }
  async function enable_roleplay_notifications_room_listeners(
    ws_connection: iWebsocket
  ) {
    ws_connection.on("wants_movie_roleplay", (dto) => {
      console.log("🚀 ~ wants_movie_roleplay.on ~ dto:", {
        dto,
        ws_connection,
      });
    });
  }

  async function handle_roleplay_chat_request(priority: iTwaMovie) {
    const moviesList = getMovies();
    const { get_connection } = WebsocketConnectionService();
    const ws_connection = get_connection();
    ws_connection.emit("request_roleplay_chat", { priority, moviesList });
  }

  return {
    addToMoviesList,
    currentSearchedMovieImage,
    getMovies,
    handle_roleplay_chat_request,
    enter_roleplay_notifications_room,
  };
});

