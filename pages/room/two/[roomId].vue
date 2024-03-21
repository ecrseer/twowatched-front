<template>
  <div
    class="flex flex-col justify-between items-stretch overflow-auto"
    v-if="roomService.current_room"
  >
    <MessageImageProvider
      v-for="msg in roomService.current_room.messages"
      :key="msg.content"
      :message="msg"
      :usersCharacters="roomService.current_room.usersCharacters"
    >
      <template #messageBubble="{ image }">
        <ChatMessageBubble
          :message="msg"
          :isCurrentUser="user.sender_user_id === msg.sender_user_id"
          :image="image"
        />
      </template>
    </MessageImageProvider>
  </div>
  <input type="text" v-model="typing" @keyup.enter="send_message" />
</template>

<script lang="ts" setup>
import MessageImageProvider from "../../../main/Twaroom/components/MessageImageProvider.vue";
import { TwaroomService } from "../../../main/Twaroom/TwaroomService";
import { UserService } from "../../../main/User/UserService";

const roomService = new TwaroomService();
const route = useRoute();
const typing = ref("");

const user = computed(() => {
  const transient_id = UserService.getTabUserId();
  return {
    room_id: route.params.roomId as string,
    sender_user_id: transient_id,
  };
});
function send_message() {
  roomService.send_message_to_room({ ...user.value, content: typing.value });
  typing.value = "";
}

onMounted(() => {
  roomService.enter_twaroom(user.value);
});
</script>

