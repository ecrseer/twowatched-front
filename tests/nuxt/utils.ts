import type { iTwaMovie } from "../../main/Movies/interfaces";

export function mockSearchedMovie(name: string) {
  const mockMovie: iTwaMovie = {
    name,
    id: +(Math.random() + "").slice(3, 15),
  };
  return mockMovie;
}

