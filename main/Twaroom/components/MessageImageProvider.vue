<template>
  <div>
    <slot
      name="messageBubble"
      :image="user_character?.profile_path"
      :user_name="user_character?.character"
    />
  </div>
</template>
<script lang="ts" setup>
import type { iTwamessage, iTwaroom } from "../dtos";
import { TwaroomService } from "../TwaroomService";

const props = defineProps<{
  message: Partial<iTwamessage>;
  usersCharacters: iTwaroom["usersCharacters"];
  sendUserId: string;
}>();
const user_character = computed(() => {
  const user_character = props.usersCharacters?.[props.sendUserId];
  if (!user_character) return null;
  return user_character;
});

const route = useRoute();
const roomService = new TwaroomService();

watch(user_character, (user) => {
  const room_id = route?.params?.roomId as string;
  console.log("~☠️ ~ watch ~ user:", { room_id });
  if (!user && room_id) {
    roomService.enter_twaroom(route.params.roomId as string, {
      preventWebsocket: true,
    });
  }
});
</script>

