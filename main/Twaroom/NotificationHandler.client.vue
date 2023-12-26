<template>
  <div></div>
</template>

<script setup lang="ts">
import type { iTwaMovie } from "../Movies/interfaces";
import { NotificationService } from "./NotificationService";

const props = defineProps<{ movieItems: iTwaMovie[] }>();
const notificationService = NotificationService();

watch(
  () => props.movieItems,
  () => {
    setTimeout(notificationService.enter_roleplay_notifications_room, 1000);
    // const { websocket } = WebsocketConnectionService();
    // console.log("🚀 ~ websocket:", websocket);
    // websocket?.emit("enter_roleplay_notifications_room");
  },
  { immediate: true }
);
</script>

