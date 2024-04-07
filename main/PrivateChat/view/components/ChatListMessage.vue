<template>
  <div class="card-body cursor-pointer" @click="navigateTo({path: `/private/chat/${private_room._id}`});">
    <h2 class="card-title">{{ last_user_name || private_room.messages?.at(-1)?.sender_user_id }}</h2>
    <p>{{ private_room.messages?.at(-1)?.content }}</p>
  </div>
</template>
<script setup lang="ts">
import type {IPrivateChat, IUserTwaMessageDto} from "~/main/PrivateChat/interfaces";
import {UserService} from "~/main/User/UserService";

const userService = new UserService();
const props = defineProps<{
  private_room: IPrivateChat;
}>()
const last_user_name = computed(() => {
  const current_user = userService.getTabUserInfo();
  const other_user = props.private_room.users.find((user) => {
    return user !== current_user._id
  });
  const msg = props.private_room.messages.find((msg) => {
    return msg.sender_user_id === other_user
  }) as IUserTwaMessageDto;
  return msg.sender_user_name
})
</script>