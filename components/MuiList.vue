<template>
  <ul class="menu glass w-56 rounded-box">
    <li>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Item 2
        <span class="badge badge-sm badge-warning" @click="create_or_go_to_room"
          >Chat</span
        >
      </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useTwaroomStore } from "../store/twaroom";

async function create_or_go_to_room() {
  //navigateTo..
  const store = useTwaroomStore();
  const room = await store.create_room();

  if (room) {
    await navigateTo({ path: `/room/two/${room._id}` });
  }
}
</script>
