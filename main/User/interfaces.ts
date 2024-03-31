export interface IUser {
  _id: string;
  email?: string;

  name: string;

  password: string;

  moviesList: string[];

  //   privateChatsFixed: PrivateChat[];
}

