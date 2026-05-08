import type { iTwaMovie } from '../../main/Movies/interfaces';

export function mockSearchedMovie(name: string) {
    const idStr = String(+(Math.random() + '').slice(3, 15));
    const mockMovie: iTwaMovie = {
        _id: idStr,
        title: name,
        id: Number(idStr),
    };
    return mockMovie;
}
