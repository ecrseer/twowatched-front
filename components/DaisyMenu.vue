<template>

  <div class="navbar bg-base-100 ">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl hidden">Twowatch</a>
    </div>
    <div class="navbar-center flex">
      <div role="tablist" class="tabs tabs-lifted">


        <NuxtLink class="tab tab-active" to="/"> Lista</NuxtLink>
        <NuxtLink class="tab [--tab-bg:yellow] [--tab-border-color:orange]" to="/private/chats"> Mensagens</NuxtLink>
        <NuxtLink class="tab" to="/sign-in"> Cadastrar</NuxtLink>
      </div>
    </div>
    <div class="navbar-end">
      <a class="btn hidden">Help</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {IUser} from "../main/User/interfaces";

defineProps<{
  user?: IUser;
}>();
</script>

