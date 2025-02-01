<template>
    <div class="first-time flex flex-col m-8 justify-around min-h-screen">
        <section>
            <h1 class="text-4xl font-bold">Vamos lá</h1>
            <p class="py-6">Diga o nome de algo que você assistiu</p>
            <DaisyInput v-model="searching" @keyup="onSearchMovieInput" />
            <div class="image-container">
                <article class="current-searched-movie-image"></article>
            </div>
        </section>
        <section class="flex justify-end">
            <button
                class="btn btn-primary"
                @click="onClickAddMovieBtn"
                :class="{
                    'invisible animate-bounce':
                        !currentSearchedMovie?.title ||
                        is_current_movie_in_user_movies,
                }"
            >
                Continuar
            </button>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { MoviesController } from '@/main/Movies/MoviesController';
import { MoviesService } from '~/main/Movies/MoviesService';

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

const moviesService = MoviesService();

const emit = defineEmits(['first-movie']);
function onClickStartAddMovieBtn() {
    onClickAddMovieBtn();
    emit('first-movie');
}
</script>
<style scoped>
.image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.image-container .current-searched-movie-image {
    border-radius: 2vh;
    width: 70vw;
    height: 20vh;
    background-position: center;
    background-size: cover;
    background-image: v-bind('moviesService.currentSearchedMovieImage');
}
</style>
