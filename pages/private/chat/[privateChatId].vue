<template>
  <div class="private-room h-full flex flex-col pb-[env(safe-area-inset-bottom)]">
    <section>
      <h1>Conversando com {{ receiver_username }}</h1>
    </section>
    <section
        class="private-chat-messages-container flex-1 overflow-auto p-4 m-2 bg-base-100 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col"
        v-if="privateChatService?.current_room"
    >
      <ChatMessageBubble
          v-for="(msg, index) in current_messages"
          :key="`${msg.content}-${index}`"
          :message="msg"
          :isCurrentUser="user.sender_user_id === msg.sender_user_id"
          :user_name="msg?.sender_user_name"
      />
    </section>
    <label class="input input-bordered flex items-center gap-2 m-2 shrink-0">
      <input
          type="text"
          class="grow"
          v-model="typing"
          @keyup.enter="send_message"
      />

      <button @click="send_message" class="btn btn-ghost btn-sm btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
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

const receiver_username = computed(() => {
  const private_room = privateChatService.current_room;
  if (!private_room) return ''
  return privateChatService.get_receiver_user_name_by_room(private_room)
})

</script>
<style scoped>
/* No longer need specific heights since we use flex layout */
</style>

