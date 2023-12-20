import { defineStore } from "pinia";
import type { iTwaroom } from "../../singleton-stores/dtos";
import { MoviesRepository } from "../Movies/MoviesRepository";

export const NotificationService = defineStore("NotificationService", () => {
  const moviesRepository = MoviesRepository();
  const current_room = ref<null | iTwaroom>(null);

  const connected = ref(false);
  const socket = useSocket();
  const io = useIO();

  function handle_roleplay_chat_request() {}
  function send_roleplay_chat_request(chosen_movie: string) {
    const current_movies = moviesRepository.getMovies();

    // const socket2 = io(config.public.BACKEND_URI);
    // socket2.emit("send_message", user);
  }
});

