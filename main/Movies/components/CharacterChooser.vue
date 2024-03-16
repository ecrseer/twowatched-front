<template>
  <div class="card card-side bg-base-100 shadow-xl" v-if="character">
    <figure>
      <img class="w-40" :src="character.profile_path" alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">New movie is released!</h2>
      <p>Click the button to watch on Jetflix app.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Watch</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TmdbCastMember } from "../interfaces";

defineProps<{
  character: TmdbCastMember;
}>();
</script>

