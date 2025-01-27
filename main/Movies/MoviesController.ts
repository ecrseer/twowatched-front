import {mockSearchedMovie} from "../../tests/nuxt/utils";
import type {iTwaMovie, iSearchRequestTmdbMovieDTO} from "./interfaces";
import {MoviesService} from "./MoviesService";
import type {iTwaroom} from "~/main/Twaroom/dtos";
import {UserService} from "~/main/User/UserService";

export function MoviesController() {
    const searching = ref("");
    const is_fetching_data = ref(false);
    const currentSearchedMovie = ref<iTwaMovie>({});

    const movieManager = MoviesService();
    const configs = useRuntimeConfig();
    const userService = new UserService();

    let bounceSearch = setTimeout(() => null, 1);

    async function searchMovie() {
        is_fetching_data.value = true;
        currentSearchedMovie.value = {};
        const base_url = "https://api.themoviedb.org/3/search/multi";
        let dto: any;
        if (searching.value?.trim()?.length < 2) return;
        try {
            const config = useRuntimeConfig();
            const movie = await $fetch<iTwaMovie>(
                `${config.public.BACKEND_URI}/movies/by-name/${searching.value}`,
                {
                    method: "GET",
                }
            );

            if (movie) {
                currentSearchedMovie.value = movie;
                movieManager.currentSearchedMovieImage = movieManager.get_movie_background_image_css(movie);

            } else {
                movieManager.currentSearchedMovieImage = ``;
            }
        } catch (err) {
            dto = null;
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
        searching.value = '';
    }

    const is_current_movie_in_user_movies = computed(() => {
        if (!currentSearchedMovie.value?.title) return true;
        const user = userService.getTabUserInfo();
        const user_movies = movieManager.getMovies();
        for (const movie of user_movies) {
            const searched = new RegExp(`${currentSearchedMovie.value.title}`, 'i');
            if (searched.test(`${movie.title}`)) {
                return true
            }
        }
        return false
    })

    return {
        searching,
        is_fetching_data,
        currentSearchedMovie,
        is_current_movie_in_user_movies,
        onSearchMovieInput,
        onClickAddMovieBtn,
        searchMovie
    };
}

