import { ManageMoviesRepository } from "./MoviesRepository";
import type { iSearchRequestTmdbMovieDTO, iTwaMovie } from "./interfaces";

export function MoviesController() {
  const searching = ref("");
  const is_fetching_data = ref(false);
  const currentSearchedMovie = ref<iTwaMovie>({});

  const movieManager = ManageMoviesRepository();
  const configs = useRuntimeConfig();

  let bounceSearch = setTimeout(() => null, 1);
  function searchMovie() {
    is_fetching_data.value = true;
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
    is_fetching_data.value = false;
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
      movieManager.addToMoviesList(mockSearchedMovie());
      throw new Error("need to search first");
    }
  }
  function mockSearchedMovie() {
    const mockMovie: iTwaMovie = {
      name: searching.value,
    };
    return mockMovie;
  }
  return { searching, onSearchMovieInput, onClickAddMovieBtn };
}

