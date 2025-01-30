<template>
    <div class="flex flex-col h-full justify-between items-stretch bg-white">
        <h1>first</h1>
    </div>
</template>

<script lang="ts" setup>
import FabBtn from '~/components/FabBtn.vue';

useHead({
    titleTemplate: '',
    title: 'twowatch',
});

import { MoviesController } from '@/main/Movies/MoviesController';
</script>
<style scoped>
.add-movie-btn {
    /*visibility: hidden;*/
}
</style>
