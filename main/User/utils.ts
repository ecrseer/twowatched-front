import type { IUser } from "./interfaces";

export function get_factory_temp_user(): IUser {
  return {
    _id: utilsRandomId(),
    email: "",
    moviesList: [],
    name: "",
    password: "",
  };
}
