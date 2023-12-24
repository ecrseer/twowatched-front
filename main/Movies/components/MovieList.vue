<template>
  <div>
    <DaisyList :items="movieItems" />
  </div>
</template>

<script setup lang="ts">
import type { iDaisyListItem } from "../../../components/DaisyList.vue";
import { TwaroomSingleton } from "../../../singleton-stores/twaroom";
import { NotificationService } from "../../Twaroom/NotificationService";
import { WebsocketConnectionService } from "../../Twaroom/WebsocketConnectionService";
import { MoviesRepository } from "../MoviesRepository";
import type { iTwaMovie } from "../interfaces";

const repository = MoviesRepository();
const notificationService = NotificationService();

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

watch(
  () => movieItems,
  () => {
    setTimeout(
      () => notificationService.enter_roleplay_notifications_room,
      1000
    );
    // const { websocket } = WebsocketConnectionService();
    // console.log("🚀 ~ websocket:", websocket);
    // websocket?.emit("enter_roleplay_notifications_room");
  },
  { immediate: true }
);

async function create_or_go_to_room(movie: iTwaMovie) {
  //navigateTo..
  // const store = TwaroomSingleton();

  // const room = await store.create_room();
  await notificationService.handle_roleplay_chat_request(movie);
  // if (room) {
  //   await navigateTo({ path: `/room/two/${room._id}` });
  // }
}
</script>

