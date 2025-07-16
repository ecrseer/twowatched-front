<template>
    <div class="flex flex-col h-full justify-between items-stretch">
        <!-- <div class="text-3xl">Seus interesses</div> -->
        <div class="flex flex-col items-center">
            <MovieList />
        </div>
        <div class="mb-2 flex justify-center items-center gap-4">
            <DaisyInput
                v-model="searching"
                :label="'Titulo do filme'"
                @keyup="onSearchMovieInput"
            />

            <FabBtn
                class="add-movie-btn"
                @click="onClickAddMovieBtn"
                :class="{
                    'opacity-30': !currentSearchedMovie?.title,
                    'opacity-100 animate-bounce': currentSearchedMovie?.title,
                }"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import FabBtn from '~/components/FabBtn.vue';
import { MoviesController } from '@/main/Movies/MoviesController';
import MovieList from '@/main/Movies/components/MovieList.vue';
import { TwaroomService } from '../main/Twaroom/TwaroomService';

useHead({
    titleTemplate: '',
    title: 'twowatch',
});

const {
    searching,
    is_fetching_data,
    currentSearchedMovie,
    is_current_movie_in_user_movies,
    onClickAddMovieBtn,
    onSearchMovieInput,
} = MoviesController();

const roomService = new TwaroomService();

onMounted(async () => {
    roomService.init();
    await roomService.enter_roleplay_notifications_room();
});
</script>
<style scoped>
.add-movie-btn {
    /*visibility: hidden;*/
}
</style>
