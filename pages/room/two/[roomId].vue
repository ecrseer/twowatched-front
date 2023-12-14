<template>
  <div
    class="flex flex-col justify-between items-stretch overflow-auto"
    v-if="store.current_room"
  >
    <ChatMessageBubble
      v-for="message in store.current_room.messages"
      :key="message.message"
      :message="message"
      :isCurrentUser="user.sender_user_id === message.sender_user_id"
    />
  </div>
  <input type="text" v-model="typing" @keyup.enter="send_message" />
</template>

<script lang="ts" setup>
import { TwaroomSingleton } from "../../../singleton-stores/twaroom";

const route = useRoute();
const store = TwaroomSingleton();
const typing = ref("");

const user = computed(() => {
  return {
    room_id: route.params.roomId as string,
    sender_user_id: "user-" + `${Math.random()}`.slice(3, 9),
  };
});
function send_message() {
  store.send_message_to_room({ ...user.value, message: typing.value });
  typing.value = "";
}

onMounted(() => {
  store.enter_room(user.value);
});
</script>
