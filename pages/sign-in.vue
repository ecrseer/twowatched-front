<template>


  <div class="flex flex-col h-full justify-between items-stretch">
    <!-- <div class="text-3xl">Seus interesses</div> -->
    <div class="flex flex-col items-center">

      <div class="card lg:card-side bg-base-100 shadow-xl">

        <div class="card-body">
          <DaisyInput v-model="form_data.email" :label="'Email'"/>
          <DaisyInput v-model="form_data.email" :label="'Email'"/>

          <DaisyInput v-model="form_data.password" :label="'Password'"/>

          <button class="bg-primary" type="button" @click="on_click_submit_sign_in">
            Sign In
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

const userService = new UserService();

const form_data = ref<IUser>(get_factory_temp_user());

async function on_click_submit_sign_in() {
  // UserService.sign_in_user(form_data.value, { goingTo: "/private/messages" });
  userService.sign_in_user(form_data.value);
}
</script>

