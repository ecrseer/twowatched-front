import type { IUser } from "./interfaces";

export class UserService {
  public static readonly STORAGE_KEY = "logged_user";
  public static startApp() {
    const tab_user = localStorage?.getItem(
      UserService.STORAGE_KEY
    ) as IUser | null;

    if (!tab_user) {
      const temp_user: IUser = this.get_factory_temp_user();
      localStorage?.setItem(UserService.STORAGE_KEY, JSON.stringify(temp_user));
    }
  }
  private static get_factory_temp_user(): IUser {
    return {
      _id: utilsRandomId(),
      email: "email",
      moviesList: [],
      name: "temp",
      password: "temp",
    };
  }
  public static getTabUserInfo(): IUser {
    const temp_user = this.get_factory_temp_user();

    if (typeof window === "undefined" || !localStorage) return temp_user;

    const logged_user = localStorage?.getItem(UserService.STORAGE_KEY);
    return logged_user ? JSON.parse(logged_user) : temp_user;
  }
}

