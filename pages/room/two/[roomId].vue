<template>
  <div
    class="flex flex-col justify-between items-stretch overflow-auto"
    v-if="store.current_room"
  >
    <ChatMessageBubble
      v-for="message in store.current_room.messages"
      :key="message.message"
      :message="message"
    />
  </div>
  <input type="text" v-model="message" @keyup.enter="send_message" />
</template>

<script lang="ts" setup>
import { useTwaroomStore } from "../../../store/twaroom";

const route = useRoute();
const store = useTwaroomStore();
const message = ref("");

const user = computed(() => {
  return {
    room_id: route.params.roomId as string,
    sender_user_id: "user-" + `${Math.random()}`.slice(3, 9),
  };
});
function send_message() {
  store.send_message_to_room({ ...user.value, message: message.value });
}

onMounted(() => {
  store.enter_room(user.value);
});
</script>
