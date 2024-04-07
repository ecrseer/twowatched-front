<template>
  <div
      class="chat"
      :class="{
      'chat-end': props.isCurrentUser,
      'chat-start': !props.isCurrentUser,
    }"
  >
    <div class="chat-image avatar cursor-pointer" @click="$emit('avatarClick')">
      <div class="w-10 rounded-full" v-if="image">
        <img :src="image"/>
      </div>
    </div>
    <div class="chat-header">
      {{ user_name?.split?.("/")?.[0] || props.message.sender_user_id }}
    </div>
    <div class="chat-bubble" :class="{'bg-primary':isCurrentUser}">{{ props.message.content }}</div>
    <div v-show="false" class="chat-footer opacity-50">Seen at 12:46</div>
  </div>
</template>
<script setup lang="ts">
import type {iTwamessage} from "../../main/Twaroom/dtos";

const props = defineProps<{
  message: Partial<iTwamessage>;
  isCurrentUser?: boolean;
  image?: string;
  user_name?: string;
}>();
</script>

