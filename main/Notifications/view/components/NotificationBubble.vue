<template>
  <div role="alert" class="alert">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info shrink-0 w-6 h-6"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>{{ notification.description }}</span>
    <div>
      <button class="btn btn-sm btn-primary" v-if="notification.onAccept" @click="notification.onAccept">
        Accept roleplay
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {iNotification} from "../../NotificationService";

const props = defineProps<{ notification: iNotification }>();
</script>

