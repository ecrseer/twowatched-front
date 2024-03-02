<template>
  <div v-if="notificationService.bottom_stack">
    <NotificationBubble
      v-for="notification in notificationService.bottom_stack"
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
</script>

