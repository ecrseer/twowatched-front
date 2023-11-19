import { ManageMovies } from "../store/ManageMovies";
import type {
  iSearchRequestTmdbMovieDTO,
  iTwaMovie,
} from "../store/ManageMovies/interfaces";

export function MoviesListController() {
  const searching = ref("");
  const currentSearchedMovie = ref<iTwaMovie>({});

  const movieManager = ManageMovies();
  const configs = useRuntimeConfig();

  let bounceSearch = setTimeout(() => null, 1);
  function searchMovie() {
    const base_url = "https://api.themoviedb.org/3/search/multi";

    useFetch(base_url, {
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
    }).then(({ data }) => {
      console.log("🚀 ~ onSearchMovieInput ~ data:", data);

      const dto = data.value as iSearchRequestTmdbMovieDTO;
      if (dto.results[0]) {
        currentSearchedMovie.value = dto.results[0];

        movieManager.currentSearchedMovieImage = `url(${TMDB_IMAGE_BASE_URI}${currentSearchedMovie.value.backdrop_path})`;
      } else {
        movieManager.currentSearchedMovieImage = ``;
      }
    });
  }

  function onSearchMovieInput() {
    clearTimeout(bounceSearch);
    // bounceSearch = setTimeout(searchMovie, 1000);
  }

  function onClickAddMovieBtn() {
    movieManager.addToMoviesList(currentSearchedMovie.value);
  }
  return { searching, onSearchMovieInput, onClickAddMovieBtn };
}

