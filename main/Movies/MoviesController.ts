import {mockSearchedMovie} from "../../tests/nuxt/utils";
import type {iTwaMovie, iSearchRequestTmdbMovieDTO} from "./interfaces";
import {MoviesService} from "./MoviesService";
import type {iTwaroom} from "~/main/Twaroom/dtos";

export function MoviesController() {
    const searching = ref("");
    const is_fetching_data = ref(false);
    const currentSearchedMovie = ref<iTwaMovie>({});

    const movieManager = MoviesService();
    const configs = useRuntimeConfig();

    let bounceSearch = setTimeout(() => null, 1);

    async function searchMovie() {
        is_fetching_data.value = true;
        const base_url = "https://api.themoviedb.org/3/search/multi";
        let dto: any;
        try {
            const config = useRuntimeConfig();
            const movie = await $fetch<iTwaMovie>(
                `${config.public.BACKEND_URI}/movies/by-name/${searching.value}`,
                {
                    method: "GET",
                }
            );

            console.log("=>(MoviesController.ts:34) dto", movie);


            if (movie) {
                currentSearchedMovie.value = movie;
                movieManager.currentSearchedMovieImage = movieManager.get_movie_background_image_css(movie);

            } else {
                movieManager.currentSearchedMovieImage = ``;
            }
        } catch (err) {
            console.error(err);
        }
        is_fetching_data.value = false;
        return dto;
    }

    function onSearchMovieInput() {
        clearTimeout(bounceSearch);
        bounceSearch = setTimeout(searchMovie, 1000);
    }

    function onClickAddMovieBtn() {
        if (is_fetching_data.value) return;

        if (currentSearchedMovie.value.title! || currentSearchedMovie.value.name) {
            movieManager.addToMoviesList(currentSearchedMovie.value);
        } else {
            movieManager.addToMoviesList(mockSearchedMovie(searching.value));
            // throw new Error("need to search first");
        }
    }

    return {searching, onSearchMovieInput, onClickAddMovieBtn, searchMovie};
}

