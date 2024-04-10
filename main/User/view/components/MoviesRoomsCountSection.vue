<script setup lang="ts">
import type {iMoviesRoomsCount} from "~/main/User/interfaces";

defineProps<{
  movies_count: iMoviesRoomsCount[]
}>()

</script>

<template>
  <div class="flex gap-12 mb-20">
    <DaisySmallCard v-for="movie in movies_count" :key="movie.card_movie[0].title" :movie="movie.card_movie[0]"
                    :count="movie.count"/>

  </div>
</template>

<style scoped>

</style>