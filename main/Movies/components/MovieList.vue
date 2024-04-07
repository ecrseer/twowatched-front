<template>
  <div>
    <DaisyList :items="movieItems"/>
  </div>
</template>

<script setup lang="ts">
import type {iDaisyListItem} from "../../../components/DaisyList.vue";
import {TwaroomService} from "../../Twaroom/TwaroomService";
import {MoviesService} from "../MoviesService";

import type {iTwaMovie} from "../interfaces";
import {UserService} from "~/main/User/UserService";

const moviesService = MoviesService();
const roomService = new TwaroomService();
const userService = new UserService();

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

async function create_or_go_to_room(movie: iTwaMovie) {
  await roomService.send_roleplay_chat_request(movie);
  //   await navigateTo({ path: `/room/two/${room._id}` });
}

onMounted(async () => {
  const user = await userService.getTabUserInfo();
  await moviesService.fetch_movies_from_user(user);
})
</script>

