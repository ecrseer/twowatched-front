import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTwaMovie } from "./interfaces";
export interface iEnterRoleplayRoomDto {
  moviesList: iTwaMovie[];
}

export const MoviesService = defineStore("MoviesService", () => {
  const moviesList = ref<iTwaMovie[]>([{ name: "Demon slayer", id: 123 }]);
  const currentSearchedMovieImage = ref("");

  function addToMoviesList(movie: iTwaMovie): iTwaMovie[] {
    moviesList.value.push(movie);
    return moviesList.value;
  }
  function getMovies() {
    return moviesList.value;
  }

  return {
    addToMoviesList,
    currentSearchedMovieImage,
    getMovies,
  };
});

