<template>
  <div class="card-body cursor-pointer" @click="navigateTo({path: `/private/chat/${private_room._id}`});">
    <h2 class="card-title">{{ last_user_name || private_room.messages?.at(-1)?.sender_user_id }}</h2>
    <p>{{ private_room.messages?.at(-1)?.content }}</p>
  </div>
</template>
<script setup lang="ts">
import type {IPrivateChat, IUserTwaMessageDto} from "~/main/PrivateChat/interfaces";
import {PrivateChatService} from "~/main/PrivateChat/PrivateChatService";


const privateChatService = new PrivateChatService()
const props = defineProps<{
  private_room: IPrivateChat;
}>()
const last_user_name = computed(() => {
  return privateChatService.get_receiver_user_name_by_room(props.private_room);
})
</script>