import { mockSearchedMovie } from "../../tests/nuxt/utils";
import type { iTwaMovie, iSearchRequestTmdbMovieDTO } from "./interfaces";
import { MoviesService } from "./MoviesService";

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
      const data = await useFetch(base_url, {
        method: "get",
        headers: {
          accept: "application/json",
        },
        query: {
          query: searching.value,
          include_adult: true,
          language: "en-US",
          page: 1,
          api_key: configs.public.TMDB_API_KEY,
        },
      });

      dto = data.data.value as iSearchRequestTmdbMovieDTO;
      if (dto.results[0]) {
        currentSearchedMovie.value = dto.results[0];

        movieManager.currentSearchedMovieImage = `url(${TMDB_IMAGE_BASE_URI}${currentSearchedMovie.value.backdrop_path})`;
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
    // bounceSearch = setTimeout(searchMovie, 1000);
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

  return { searching, onSearchMovieInput, onClickAddMovieBtn, searchMovie };
}

