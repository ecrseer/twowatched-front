import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTmdbMovieCastCredits, iTwaMovie } from "./interfaces";
import { TwaroomService } from "../Twaroom/TwaroomService";
export interface iEnterRoleplayRoomDto {
  moviesList: iTwaMovie[];
}

export const MoviesService = defineStore("MoviesService", () => {
  const moviesList = ref<iTwaMovie[]>([{ title: "Matrix", id: 123 }]);
  const currentSearchedMovieImage = ref("");
  const roomService = new TwaroomService();

  function addToMoviesList(movie: iTwaMovie): iTwaMovie[] {
    moviesList.value.push(movie);
    roomService.enter_roleplay_notifications_room();
    return moviesList.value;
  }
  function getMovies() {
    return moviesList.value;
  }
  async function get_movie_characters(movie_id: string) {
    const config = useRuntimeConfig();
    const characters = await $fetch<iTmdbMovieCastCredits>(
      `${config.public.BACKEND_URI}/movies/characters/${movie_id}`,
      {
        method: "GET",
      }
    );
    return characters;
  }

  return {
    addToMoviesList,
    currentSearchedMovieImage,
    getMovies,
    get_movie_characters,
  };
});

