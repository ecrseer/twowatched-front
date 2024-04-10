<template>

  <div class="navbar bg-base-content/80 min-h-0 p-0  "
  >
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl  ">
        <DaisyThemeSwitcher/>
      </a>
    </div>
    <div class="navbar-center flex">
      <div role="tablist" class="tabs tabs-lifted tabs-lg">
        <DaisyNuxtLink :href="'/'">
          Lista
        </DaisyNuxtLink>
        <DaisyNuxtLink :href="'/private/chats'">
          Mensagens
        </DaisyNuxtLink>
        <template v-if="is_real_user">
          <DaisyNuxtLink :href="'/user-profile'">
            Perfil
          </DaisyNuxtLink>

        </template>
        <template v-else>

          <DaisyNuxtLink :href="'/sign-in'">
            Cadastrar
          </DaisyNuxtLink>
          <DaisyNuxtLink :href="'/login'">
            Login
          </DaisyNuxtLink>
        </template>


      </div>
    </div>
    <div class="navbar-end">
      <section role="tablist" class="tabs tabs-lifted tabs-lg rotate-180 scale-125	" v-if="user?.name">
        <div class="tab tab-active text-base-content/80">
          <section class="text-xs rotate-180">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">{{ user?.name }}</div>
              <ul tabindex="0" class="menu dropdown-content z-[1] text-xs shadow bg-base-100 rounded-box w-52 mt-1">
                <li @click="logout"><a>Sair</a></li>

              </ul>
            </div>
          </section>
        </div>
      </section>

    </div>
  </div>
</template>
<script setup lang="ts">
import type {IUser} from "../main/User/interfaces";
import DaisyThemeSwitcher from "~/components/DaisyThemeSwitcher.vue";
import DaisyNuxtLink from "~/components/DaisyNuxtLink.vue";
import {UserService} from "~/main/User/UserService";
import {MoviesService} from "~/main/Movies/MoviesService";

const movieService = MoviesService()

const props = defineProps<{
  user?: IUser;
}>();
const route = useRoute()
const is_real_user = computed(() => new UserService().is_real_user(props.user))
const current_route = computed(() => route.path)

function logout() {
  new UserService().logout()
  navigateTo('/', {replace: true});

}

function refresh() {
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}
</script>

<style scoped>
.searched_movie_image {
  background-image: v-bind("movieService.currentSearchedMovieImage");
}
</style>

