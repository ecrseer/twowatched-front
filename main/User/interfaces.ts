import type {iTwaMovie} from "~/main/Movies/interfaces";

export interface IUser {
    _id: string;
    email: string;

    name: string;

    password: string;

    moviesList: string[];

    //   privateChatsFixed: PrivateChat[];
}

export interface iMoviesRoomsCount {
    count: number;
    card_movie: [iTwaMovie];
}
