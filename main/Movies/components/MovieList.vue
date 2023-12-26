<template>
  <div>
    <DaisyList :items="movieItems" />
  </div>
</template>

<script setup lang="ts">
import type { iDaisyListItem } from "../../../components/DaisyList.vue";
import { MoviesService } from "../MoviesService";

import type { iTwaMovie } from "../interfaces";

const repository = MoviesService();

const movieItems = computed(() => {
  const movies = repository.getMovies();
  return movies.map((movie) => {
    const actionItem: iDaisyListItem = {
      ...movie,
      badge: "Chat",
      onBadgeClick: () => create_or_go_to_room(movie),
      icon: "home",
      name: movie?.name || movie?.title || "---",
    };
    return actionItem;
  });
});

repository.enter_roleplay_notifications_room();

async function create_or_go_to_room(movie: iTwaMovie) {
  //navigateTo..
  // const store = TwaroomSingleton();

  // const room = await store.create_room();
  await repository.handle_roleplay_chat_request(movie);
  // if (room) {
  //   await navigateTo({ path: `/room/two/${room._id}` });
  // }
}
</script>

