<template>
  <div class="private-room">
    <section>
      <h1>private{{ privateChatService?.current_room?._id }}}</h1>
    </section>
    <section
        class="private-chat-messages-container overflow-auto p-4 m-2 bg-base-100 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col"
        v-if="privateChatService.current_room"
    >
      <ChatMessageBubble
          v-for="(msg, index) in current_messages"
          :key="`${msg.content}-${index}`"
          :message="msg"
          :isCurrentUser="user.sender_user_id === msg.sender_user_id"
          :user_name="msg?.sender_user_name"
      />
    </section>
    <label class="input input-bordered flex items-center gap-2">
      <input
          type="text"
          class="grow"
          v-model="typing"
          @keyup.enter="send_message"
      />

      <kbd class="kbd kbd-sm">Enter</kbd>
    </label>
  </div>
</template>

<script lang="ts" setup>
import {UserService} from "../../../main/User/UserService";
import {PrivateChatService} from "../../../main/PrivateChat/PrivateChatService";
import type {IUserTwaMessageDto} from "~/main/PrivateChat/interfaces";

const privateChatService = new PrivateChatService();

const userService = new UserService();

const route = useRoute();
const typing = ref("");

onMounted(() => {
  const room_id = route.params.privateChatId as string;

  privateChatService.set_current_room_id(room_id);
  privateChatService.enter_private_chat(route.params.privateChatId as string);
});
const current_messages = computed(() => {
  return privateChatService.current_room.messages as IUserTwaMessageDto[]
})
const user = computed(() => {
  const transient_id = userService.getTabUserInfo()._id;
  return {
    room_id: route.params.privateChatId as string,
    sender_user_id: transient_id,
  };
});

function send_message() {
  privateChatService.send_message_private_chat({
    ...user.value,
    content: typing.value,
  });
  typing.value = "";
}
</script>
<style scoped>
.private-room {
  display: grid;
}

.private-chat-messages-container {
  min-height: 40vh;
}
</style>

