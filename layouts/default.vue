<template>
  <header
      class="flex flex-col justify-center items-center  w-full"
  >
    <DaisyMenu :user="logged_user"/>

  </header>
  <div class="h-full w-full font-sans">
    <div
        class="current-searched-movie-image bg-cover bg-no-repeat bg-center absolute w-full h-full blur brightness -z-50"
        v-if="true"
    ></div>
    <div class="h-full p-12">

      <NotificationsTopHandlerClient/>
      <main class="h-full">
        <slot/>

      </main>
    </div>
    <footer>
      <div
          class="flex flex-col justify-center items-center fixed bottom-0 w-full"
      >
        <NotificationsBottomHandlerClient/>

      </div>
      <div class="fixed bottom-0 right-0 overflow-hidden" v-show="false">
        <div class="badge badge-xs">
          powered by

          <img
              class="w-5"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          />
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import {TwaroomService} from "~/main/Twaroom/TwaroomService";
import {MoviesService} from "../main/Movies/MoviesService";
import NotificationsBottomHandlerClient from "../main/Notifications/view/NotificationsBottomHandler.client.vue";
import NotificationsTopHandlerClient from "../main/Notifications/view/NotificationsTopHandler.client.vue";
import {UserService} from "~/main/User/UserService";

const moviesService = MoviesService();
const roomService = new TwaroomService();
const userService = new UserService();

onMounted(async () => {
  userService.startApp();
  
  let user = await userService.tryGetRealUser();
  if (!user) {
    user = userService.getTabUserInfo();
  }
  await moviesService.fetch_movies_from_user(user);

  roomService.init();
  await roomService.enter_roleplay_notifications_room();
})
const logged_user = computed(() => userService.getTabUserInfo());
</script>
<style scoped>
.current-searched-movie-image {
  background-image: v-bind("moviesService.currentSearchedMovieImage");
}

.hm-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>

