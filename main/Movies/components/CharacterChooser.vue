<template>
  <div class="card card-side bg-base-100 shadow-xl" v-if="character">
    <figure>
      <img class="w-32" :src="character.profile_path" alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ character.character }}</h2>
      <p>Ator/atriz: {{ character.name }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="emit('choosed')">
          Escolher
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TmdbCastMember } from "../interfaces";

defineProps<{
  character: TmdbCastMember;
}>();
const emit = defineEmits<{
  (e: "choosed", id?: number): void;
}>();
</script>

