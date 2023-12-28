<template>
  <div v-if="notificationService.stack">
    <NotificationBubble
      v-for="notification in notificationService.stack"
      :key="notification.title"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import {
  NotificationService,
  type iNotification,
} from "../NotificationService";
import NotificationBubble from "./components/NotificationBubble.vue";

const notificationService = new NotificationService();
</script>

