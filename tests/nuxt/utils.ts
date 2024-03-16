import type { iTwaMovie } from "../../main/Movies/interfaces";

export function mockSearchedMovie(name: string) {
  const mockMovie: iTwaMovie = {
    title: name,
    id: +(Math.random() + "").slice(3, 15),
  };
  return mockMovie;
}

