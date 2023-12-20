<template>
  <div>
    <DaisyList :items="movieItems" />
  </div>
</template>

<script setup lang="ts">
import type { iDaisyListItem } from "../../../components/DaisyList.vue";
import { TwaroomSingleton } from "../../../singleton-stores/twaroom";
import { MoviesRepository } from "../MoviesRepository";

const repository = MoviesRepository();

const movieItems = computed(() => {
  const movies = repository.getMovies();
  return movies.map((movie) => {
    const actionItem: iDaisyListItem = {
      ...movie,
      badge: "Chat",
      onBadgeClick: create_or_go_to_room,
      icon: "home",
      name: movie.name || "---",
    };
    return actionItem;
  });
});

async function create_or_go_to_room() {
  //navigateTo..
  const store = TwaroomSingleton();

  const room = await store.create_room();

  if (room) {
    await navigateTo({ path: `/room/two/${room._id}` });
  }
}
</script>

