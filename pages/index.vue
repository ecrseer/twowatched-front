<template>
  <div class="flex flex-col h-full justify-between items-stretch">
    <div class="text-3xl">{{ searching }}</div>
    <div class="flex flex-col items-center">
      <MovieList />
    </div>
    <div class="mb-12 mx-12">
      <DaisyInput
        v-model="searching"
        :label="'searching'"
        @keyup="onSearchMovieInput"
        @keydown.enter="onClickAddMovieBtn"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "",
  title: "twowatch",
});

import { MoviesController } from "@/main/Movies/MoviesController";
import MovieList from "@/main/Movies/components/MovieList.vue";

const { searching, onClickAddMovieBtn, onSearchMovieInput } =
  MoviesController();
</script>
