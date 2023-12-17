import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTwaMovie } from "./interfaces";

export const ManageMoviesRepository = defineStore(
  "ManageMoviesRepository",
  () => {
    const moviesList = ref<iTwaMovie[]>([{ name: "Demon slayer" }]);
    const currentSearchedMovieImage = ref("");

    function addToMoviesList(movie: iTwaMovie) {
      moviesList.value.push(movie);
    }
    function getMovies() {
      return moviesList.value;
    }
    return { addToMoviesList, currentSearchedMovieImage, getMovies };
  }
);

