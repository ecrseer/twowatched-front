import type { iTwaMovie } from "../../main/Movies/interfaces";

export function mockSearchedMovie(name: string) {
  const mockMovie: iTwaMovie = {
    name,
  };
  return mockMovie;
}

