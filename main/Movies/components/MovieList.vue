<template>
  <div>
    <DaisyList :items="movieItems" />
  </div>
</template>

<script setup lang="ts">
import type { iDaisyListItem } from "../../../components/DaisyList.vue";
import { TwaroomService } from "../../Twaroom/TwaroomService";
import { MoviesService } from "../MoviesService";

import type { iTwaMovie } from "../interfaces";

const moviesService = MoviesService();
const roomService = new TwaroomService();

const movieItems = computed(() => {
  const movies = moviesService.getMovies();
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

roomService.enter_roleplay_notifications_room();

async function create_or_go_to_room(movie: iTwaMovie) {
  await roomService.handle_roleplay_chat_request(movie);
  //   await navigateTo({ path: `/room/two/${room._id}` });
}
</script>

