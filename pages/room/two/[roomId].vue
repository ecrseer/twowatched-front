<template>
  <div class="roleplay-chat-room">
    <div
        class="overflow-auto p-4 m-2 bg-base-100 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col roleplay-msgs-container"
        v-if="roomService.current_room"
    >
      <MessageImageProvider
          v-for="msg in roomService.current_room.messages"
          :key="msg.content"
          :message="msg"
          :usersCharacters="roomService.current_room.usersCharacters"
          :sendUserId="msg.sender_user_id"
      >
        <template #messageBubble="{ image, user_name }">
          <ChatMessageBubble
              :message="msg"
              :isCurrentUser="user.sender_user_id === msg.sender_user_id"
              :image="image"
              :user_name="user_name"
              @avatarClick="() => onAvatarClick(msg, msg.sender_user_id)"
          />
        </template>
      </MessageImageProvider>
    </div>
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
import type {TmdbCastMember} from "../../../main/Movies/interfaces";
import MessageImageProvider from "../../../main/Twaroom/components/MessageImageProvider.vue";
import type {iTwamessage} from "../../../main/Twaroom/dtos";
import {TwaroomService} from "../../../main/Twaroom/TwaroomService";
import {UserService} from "../../../main/User/UserService";
import {PrivateChatService} from "../../../main/PrivateChat/PrivateChatService";

const roomService = new TwaroomService();
const userService = new UserService();
const privateChatService = new PrivateChatService();

const route = useRoute();
const typing = ref("");

onMounted(async () => {

  const user_id = await userService.tryGetRealUser();
  user.value.room_id = route.params.roomId as string;
  user.value.sender_user_id = user_id?._id || userService.getTabUserInfo()._id;

  roomService.enter_twaroom(route.params.roomId as string);
});

const user = ref({
  room_id: route.params.roomId as string,
  sender_user_id: 'id',
});

function send_message() {
  roomService.send_message_to_room({...user.value, content: typing.value});
  typing.value = "";
  // refetch_character_if_not_present();
}

async function onAvatarClick(msg: iTwamessage, requested_user_id: string) {
  // navigateTo({ path: "/sign-in/" });
  privateChatService.start_private_chat({requested_user_id});
}


</script>
<style scoped>
.roleplay-chat-room {
  /*display: grid;
  grid-template-rows: 60dvh 200px;*/
}

.roleplay-msgs-container {
  max-height: 55vh;
}
</style>

