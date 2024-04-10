<template>
  <div class="hero min-h-screen ">
    <section class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left m-4">
        <h1 class="text-5xl font-bold">Bem vindo(a) de volta!</h1>
        <p class="py-6"> Entre para encontrar outros usuários que gostem dos mesmo filmes que você !</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <section class="card-body">
          <DaisyInput v-model="form_data.email" :label="'Email'"/>
          <DaisyInput type="password" v-model="form_data.password" :label="'Password'"/>
          <div class="form-control mt-6">
            <button class="btn btn-outline"
                    @click="on_click_submit_login_in"
            >Login
            </button>
          </div>
        </section>
      </div>
    </section>
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

async function on_click_submit_login_in() {
  // UserService.sign_in_user(form_data.value, { goingTo: "/private/messages" });
  const created = await userService.login_user(form_data.value);
  if (!created) return;

  const notify_service = new NotificationService();

  setTimeout(() => {
    navigateTo('/')
    refresh();
  }, 1000);
}

function refresh() {
  setTimeout(() => {
    window.location.reload()

  }, 10);
}

</script>

