<template>
  <div>
    {{ form_data }}

    <DaisyInput v-model="form_data.email" :label="'Email'" />

    <DaisyInput v-model="form_data.password" :label="'Password'" />

    <button class="bg-primary" type="button" @click="on_click_submit_sign_in">
      Sign In
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { UserService } from "../main/User/UserService";
import { get_factory_temp_user } from "../main/User/utils";
import type { IUser } from "../main/User/interfaces";

const form_data = ref<IUser>(get_factory_temp_user());

async function on_click_submit_sign_in() {
  UserService.sign_in_user(form_data.value);
}
</script>

