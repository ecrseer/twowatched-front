<template>
  <ul class="menu glass menu-horizontal rounded-box">
    <li>
      <NuxtLink to="/"> Lista </NuxtLink>
    </li>
    <li>
      <a>
        Mensagens {{ user?._id }}
        <span class="badge badge-sm">99+</span>
      </a>
    </li>
    <li @click="navigateTo({ path: `/sign-in/` })">
      <a> Cadastrar </a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { IUser } from "../main/User/interfaces";

defineProps<{
  user?: IUser;
}>();
</script>

