<template>
  <li class="m-2 rounded-box shadow-xl daisy-list-item">
    <a>
      {{ item.name }}
      <span
          v-if="item.badge"
          class="badge badge-sm badge-warning"
          @click="item.onBadgeClick"
      >{{ item.badge }}</span
      >
    </a>
  </li>
</template>
<script setup lang="ts">
import type {iDaisyListItem} from "~/components/DaisyList.vue";
import {MoviesService} from "~/main/Movies/MoviesService";

const props = defineProps<{
  item: iDaisyListItem
}>()

const movie_image = computed(() => {
  const url = MoviesService().get_movie_background_image_css(props.item);
  const shaded = `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)), ${url}`
  return shaded
})

</script>
<style scoped>
.daisy-list-item {
  background: v-bind(movie_image);
  background-position: center;
  background-size: cover;
}

</style>