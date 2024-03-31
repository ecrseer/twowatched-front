import type { IUser } from "./interfaces";
import { get_factory_temp_user } from "./utils";

export class UserService {
  public static readonly STORAGE_KEY = "logged_user";

  public static startApp() {
    const tab_user = localStorage?.getItem(
      UserService.STORAGE_KEY
    ) as IUser | null;

    if (!tab_user) {
      const temp_user: IUser = get_factory_temp_user();
      this.set_logged_user(temp_user);
    }
  }

  private static set_logged_user(temp_user: IUser) {
    localStorage?.setItem(UserService.STORAGE_KEY, JSON.stringify(temp_user));
  }

  public static getTabUserInfo(): IUser {
    const temp_user = get_factory_temp_user();

    if (typeof window === "undefined" || !localStorage) return temp_user;

    const logged_user = localStorage?.getItem(UserService.STORAGE_KEY);
    return logged_user ? JSON.parse(logged_user) : temp_user;
  }

  public static async sign_in_user(user: IUser) {
    const config = useRuntimeConfig();
    const url = `${config.public.BACKEND_USERS_URI}/user/`;
    alert(url);
    try {
      const created = await $fetch<IUser>(url, {
        method: "POST",
        body: user,
      });
      return created;
    } catch (err) {
      console.log("~☠️ ~ UserService ~ sign_in_user ~ err:", err);
    }
  }
}

