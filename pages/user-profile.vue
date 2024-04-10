<template>
  <div class="hero min-h-screen " v-if="user?.name">
    <div class="hero-content flex-col lg:flex-row-reverse">


      <div class="">
        <div class="hero min-h-screen ">
          <section class="hero-content flex-col lg:flex-row-reverse max-w-2xl">
            <MoviesRoomsCountSection v-if="movies_count" :movies_count="movies_count"/>
            <div class="card shrink-0 w-full  shadow-2xl bg-base-100">
              <section class="card-body">
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

                <button class="btn mt-5 btn-primary " @click="()=>userService.edit_user(user)">Editar</button>

                <div class="flex  gap-2">

                  <img :src="user_img"
                       class="max-w-sm rounded-lg shadow-2xl"/>
                </div>
              </section>
            </div>
          </section>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {UserService} from "~/main/User/UserService";
import {type IUser} from "~/main/User/interfaces";
import MoviesRoomsCountSection from "~/main/User/view/components/MoviesRoomsCountSection.vue";

const userService = new UserService();
const user = ref<IUser | undefined>(undefined);
const user_img = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
const movies_count = ref<any[]>([]);

onMounted(async () => {
  const current = await userService.tryGetRealUser();
  user.value = {...current}
  const coun = await userService.find_movies_count_from_user()
  console.log("=>(user-profile.vue:40) coun", coun);
  movies_count.value = coun;
})
</script>


<style scoped>

</style>