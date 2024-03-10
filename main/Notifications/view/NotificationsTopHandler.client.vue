<template>
  <div v-if="notificationService.top_stack">
    <NotificationBubble
      v-for="notification in notificationService.top_stack"
      :key="notification.title"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { TwaroomService } from "../../Twaroom/TwaroomService";
import {
  NotificationService,
  type iNotification,
} from "../NotificationService";
import NotificationBubble from "./components/NotificationBubble.vue";

const notificationService = new NotificationService();
const roomService = new TwaroomService();
</script>

