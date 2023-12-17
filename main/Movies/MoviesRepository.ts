import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { iTwaMovie } from "./interfaces";

export const ManageMoviesRepository = defineStore(
  "ManageMoviesRepository",
  () => {
    const moviesList = ref<iTwaMovie[]>([]);
    const currentSearchedMovieImage = ref("");

    function addToMoviesList(movie: iTwaMovie) {
      moviesList.value.push(movie);
    }
    return { addToMoviesList, currentSearchedMovieImage };
  }
);

