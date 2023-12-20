import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTwaMovie } from "./interfaces";

export const MoviesRepository = defineStore("MoviesRepository", () => {
  const moviesList = ref<iTwaMovie[]>([{ name: "Demon slayer" }]);
  const currentSearchedMovieImage = ref("");

  function addToMoviesList(movie: iTwaMovie): iTwaMovie[] {
    moviesList.value.push(movie);
    return moviesList.value;
  }
  function getMovies() {
    return moviesList.value;
  }
  return { addToMoviesList, currentSearchedMovieImage, getMovies };
});

