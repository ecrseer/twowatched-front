import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {iTmdbMovieCastCredits, iTwaMovie} from "./interfaces";
import {TwaroomService} from "../Twaroom/TwaroomService";
import {UserService} from "~/main/User/UserService";

export interface iEnterRoleplayRoomDto {
    moviesList: iTwaMovie[];
}

export const MoviesService = defineStore("MoviesService", () => {
    const currentSearchedMovieImage = ref("");
    const roomService = new TwaroomService();
    const userService = new UserService();


    async function addToMoviesList(movie: iTwaMovie) {
        userService.add_movies_to_current_user([movie]);
        roomService.enter_roleplay_notifications_room();
    }

    function getMovies() {
        return userService.getTabUserInfo().moviesList;
    }

    async function get_movie_characters(movie_id: string) {
        const config = useRuntimeConfig();
        const characters = await $fetch<iTmdbMovieCastCredits["credits"]["cast"]>(
            `${config.public.BACKEND_URI}/movies/characters/${movie_id}`,
            {
                method: "GET",
            }
        );
        return characters;
    }

    return {
        addToMoviesList,
        currentSearchedMovieImage,
        getMovies,
        get_movie_characters,
    };
});

