<template>

  <div class="navbar bg-base-content min-h-0 p-0 ">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl  ">
        <DaisyThemeSwitcher/>
      </a>
    </div>
    <div class="navbar-center flex">
      <div role="tablist" class="tabs tabs-lifted tabs-lg">
        <NuxtLink class="tab "
                  :class="{'tab-active   ':current_route==='/'}"
                  to="/">
          <p class="text-sm">Lista</p>
        </NuxtLink>
        <NuxtLink class="tab  "
                  :class="{'tab-active   ':current_route==='/private/chats'}"
                  to="/private/chats">
          <p class="text-sm">Mensagens</p>
        </NuxtLink>
        <NuxtLink class="tab  "
                  :class="{'tab-active   ':current_route==='/sign-in'}"
                  to="/sign-in">
          <p class="text-sm">Cadastrar</p>
        </NuxtLink>
      </div>
    </div>
    <div class="navbar-end">
      <a class="btn hidden">Help</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {IUser} from "../main/User/interfaces";
import DaisyThemeSwitcher from "~/components/DaisyThemeSwitcher.vue";

const route = useRoute()
const current_route = computed(() => route.path)
defineProps<{
  user?: IUser;
}>();
</script>

