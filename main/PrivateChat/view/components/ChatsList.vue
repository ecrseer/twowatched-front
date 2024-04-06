<template>
  <div class="card w-96 glass" v-for="room_key in Object.keys(all_rooms)" :key="room_key">
    <div class="card-body" v-if="room_key">
      <h2 class="card-title">{{ all_rooms[room_key]?.messages?.at(-1)?.sender_user_id }}</h2>
      <p>{{ all_rooms[room_key]?.messages?.at(-1)?.content }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">
import type {IAllRooms} from "~/main/PrivateChat/interfaces";

defineProps<{ all_rooms: IAllRooms }>()
</script>