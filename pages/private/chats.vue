<template>

  <div class="flex flex-col h-full gap-1 justify-between items-stretch">

    <div class="flex flex-col items-center">
      <ChatsList :all_rooms="all_rooms"/>

    </div>

  </div>
</template>

<script setup lang="ts">
import {PrivateChatService} from "../../main/PrivateChat/PrivateChatService";
import ChatsList from "~/main/PrivateChat/view/components/ChatsList.vue";
import MovieList from "~/main/Movies/components/MovieList.vue";

const privateChatService = new PrivateChatService();
const all_rooms = computed(() => privateChatService.all_rooms);
onMounted(() => {

  privateChatService.get_enter_all_private_chats();
})
</script>

