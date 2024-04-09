import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {iTmdbMovieCastCredits, iTwaMovie} from "./interfaces";
import {TwaroomService} from "../Twaroom/TwaroomService";
import {UserService} from "~/main/User/UserService";
import type {IUser} from "~/main/User/interfaces";

export interface iEnterRoleplayRoomDto {
    moviesListIds: string[];
}

type IMovie_ID = string;
export const MoviesService = defineStore("MoviesService", () => {
    const currentSearchedMovieImage = ref("");
    const roomService = new TwaroomService();
    const userService = new UserService();
    const recent_searches = ref<Record<IMovie_ID, iTwaMovie>>({});


    async function addToMoviesList(movie: iTwaMovie) {
        const user = await userService.add_movies_to_current_user([movie]);

        await fetch_movies_from_user(user);
        await roomService.enter_roleplay_notifications_room();
    }

    function getMovies() {
        return userService.getTabUserInfo().moviesList
            .map((movie_id) => recent_searches.value[movie_id])
            .filter((movie) => !!movie);
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

    async function fetch_movies_from_user(user: IUser) {
        const config = useRuntimeConfig();
        const movies = await $fetch<iTwaMovie[]>(`${config.public.BACKEND_URI}/movies/by-ids`, {
            method: "POST",
            body: {ids: user.moviesList},
        });


        for (const movie of movies) {
            const movie_id = movie._id as string
            recent_searches.value[movie_id] = movie;
        }
        return movies;
    }

    function get_movie_background_image_css(movie: iTwaMovie) {
        return `url(${TMDB_IMAGE_BASE_URI}${movie?.backdrop_path || movie?.poster_path})`
    }

    return {
        addToMoviesList,
        currentSearchedMovieImage,
        recent_searches,
        getMovies,
        get_movie_characters,
        fetch_movies_from_user,
        get_movie_background_image_css
    };
});

