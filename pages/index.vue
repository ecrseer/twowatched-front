<template>
  <div class="flex flex-col h-full justify-between items-stretch">
    <!-- <div class="text-3xl">Seus interesses</div> -->
    <div class="flex flex-col items-center">
      <MovieList/>
    </div>
    <div class="mb-12 mx-12 flex justify-center items-center gap-4">

      <DaisyInput
          v-model="searching"
          :label="'Titulo do filme'"
          @keyup="onSearchMovieInput"

      />

      <FabBtn class="add-movie-btn"
              @click="onClickAddMovieBtn"
              :class="{'invisible animate-bounce': !currentSearchedMovie?.title || is_current_movie_in_user_movies  }"
      />

    </div>
  </div>
</template>

<script lang="ts" setup>
import FabBtn from "~/components/FabBtn.vue";

useHead({
  titleTemplate: "",
  title: "twowatch",
});

import {MoviesController} from "@/main/Movies/MoviesController";
import MovieList from "@/main/Movies/components/MovieList.vue";

const {
  searching,
  is_fetching_data,
  currentSearchedMovie,
  is_current_movie_in_user_movies,
  onClickAddMovieBtn,
  onSearchMovieInput
} =
    MoviesController();
</script>
<style scoped>
.add-movie-btn {
  /*visibility: hidden;*/
}

</style>