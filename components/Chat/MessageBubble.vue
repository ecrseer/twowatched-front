<template>
  <div
    class="chat"
    :class="{
      'chat-end': props.isCurrentUser,
      'chat-start': !props.isCurrentUser,
    }"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="image" />
      </div>
    </div>
    <div class="chat-header">
      {{ props.message.sender_user_id }}
    </div>
    <div class="chat-bubble">{{ props.message.content }}</div>
    <div class="chat-footer opacity-50">Seen at 12:46</div>
  </div>
</template>
<script setup lang="ts">
import type { iTwamessage } from "../../main/Twaroom/dtos";

const props = defineProps<{
  message: Partial<iTwamessage>;
  isCurrentUser?: boolean;
  image?: string;
}>();
</script>

