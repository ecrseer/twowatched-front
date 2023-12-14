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
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="chat-header">
      {{ props.message.sender_user_id }}
    </div>
    <div class="chat-bubble">{{ props.message.message }}</div>
    <div class="chat-footer opacity-50">Seen at 12:46</div>
  </div>
</template>
<script setup lang="ts">
import type { iTwamessage } from "../../singleton-stores/dtos";

const props = defineProps<{
  message: Partial<iTwamessage>;
  isCurrentUser?: boolean;
}>();
</script>
