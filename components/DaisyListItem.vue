<template>
    <div class="card bg-base-100 image-full shadow-xs" style="width: 37vw">
        <figure>
            <img :src="movie_image" alt="Shoes" />
        </figure>
        <div class="card-body flex justify-between items-center">
            <h2 class="card-title">{{ item.name }}</h2>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="item.onBadgeClick">
                    Chat
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { iDaisyListItem } from '~/components/DaisyList.vue';
import { MoviesService } from '~/main/Movies/MoviesService';

const props = defineProps<{
    item: iDaisyListItem;
}>();

const movie_image = computed(() => {
    const url = MoviesService().get_movie_img(props.item);

    return url;
});

console.log('=>(DaisyListItem.vue:32) item', props.item);
</script>
<style scoped></style>
