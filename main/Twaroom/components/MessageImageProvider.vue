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
import type { TmdbCastMember } from "../../Movies/interfaces";
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
</script>

