<template>
  <div class="card w-96 glass" v-for="room_key in Object.keys(all_rooms)" :key="room_key">
    <ChatListMessage v-if="room_key" :private_room="all_rooms[room_key]"/>
  </div>
</template>

<script setup lang="ts">
import type {IAllRooms} from "~/main/PrivateChat/interfaces";
import ChatListMessage from "~/main/PrivateChat/view/components/ChatListMessage.vue";

defineProps<{ all_rooms: IAllRooms }>()
</script>