<template>
  <div>
    <slot
      name="messageBubble"
      :image="props.usersCharacters?.[sendUserId]?.profile_path || ''"
    />
  </div>
</template>
<script lang="ts" setup>
import { UserService } from "../../User/UserService";
import type { iTwamessage, iTwaroom } from "../dtos";

const props = defineProps<{
  message: Partial<iTwamessage>;
  usersCharacters: iTwaroom["usersCharacters"];
  sendUserId: string;
}>();
</script>

