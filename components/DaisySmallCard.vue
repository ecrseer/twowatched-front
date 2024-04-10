<script setup lang="ts">
import {MoviesService} from "~/main/Movies/MoviesService";
import type {iTwaMovie} from "~/main/Movies/interfaces";

const props = defineProps<{ movie: iTwaMovie, count: number }>()
const movieService = MoviesService()
const image_url = computed(() => {
  const css_img = movieService.get_movie_background_image_css(props.movie);

  const pattern = /url\((.*?)\)/;
  const match = css_img.match(pattern);

  if (match) {
    const parameter = match[1];
    return parameter;
  }
  return ''
})
</script>

<template>
  <div class="card w-32 h-16 bg-base-100 shadow-xl image-full">
    <figure><img :src="image_url" alt="movie"/>
    </figure>
    <div class="card-body" style="height:172px; padding:12px;">
      <h2 class="card-title" style="
    text-overflow: ellipsis;
    font-size: 0.9rem;
">{{ movie.title }}</h2>
      <p class="text-xs">Você conversou {{ count }} vezes com pessoas que gostam desse filme</p>
      <div class="card-actions justify-end">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>