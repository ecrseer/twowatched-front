<template>


  <div class="flex flex-col h-full justify-between items-stretch">
    <!-- <div class="text-3xl">Seus interesses</div> -->
    <div class="flex flex-col items-center">

      <div class="card lg:card-side bg-base-100 shadow-xl">

        <div class="card-body">
          <DaisyInput v-model="form_data.name" :label="'Nome'"/>
          <DaisyInput v-model="form_data.email" :label="'Email'"/>

          <DaisyInput type="password" v-model="form_data.password" :label="'Password'"/>


          <button
              @click="on_click_submit_sign_in"
              class="btn btn-active btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Sign In
          </button>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

import {UserService} from "../main/User/UserService";
import {get_factory_temp_user} from "../main/User/utils";
import type {IUser} from "../main/User/interfaces";
import {NotificationService} from "~/main/Notifications/NotificationService";

const userService = new UserService();

const form_data = ref<IUser>(get_factory_temp_user());

async function on_click_submit_sign_in() {
  // UserService.sign_in_user(form_data.value, { goingTo: "/private/messages" });
  const created = await userService.sign_in_user(form_data.value);
  if (!created) return;

  const notify_service = new NotificationService();

  notify_service.add_fading_notification(
      {
        title: 'Conta criada',
        description: `Sua conta foi criada e logada com sucesso! Bem vindo(a) ${created.name}!`,
      },
      "bottom"
  );
  navigateTo('/')
}
</script>

