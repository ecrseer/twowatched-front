<template>
  <div class="hero min-h-screen " v-if="user?.name">
    <div class="hero-content flex-col lg:flex-row-reverse">

      <div>
        <h1 class="text-5xl font-bold">Perfil</h1>
        <p class="mt-6">
          <DaisyInput v-model="user.name" label="Nome"/>
        </p>
        <p class="mt-6">
          <DaisyInput v-model="user.email" label="Email"/>
        </p>
        <p class="">
          Criado em: {{ new Date(user.createdAt).toLocaleDateString() }}
        </p>
        <button class="btn mt-5 btn-primary">Editar</button>
      </div>
      <img :src="user_img"
           class="max-w-sm rounded-lg shadow-2xl"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserService} from "~/main/User/UserService";
import type {IUser} from "~/main/User/interfaces";

const userService = new UserService();
const user = ref<IUser | undefined>(undefined);
const user_img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

onMounted(async () => {
  user.value = await userService.tryGetRealUser();
})
</script>


<style scoped>

</style>