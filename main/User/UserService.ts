import { defineStore } from "pinia";
import type { IUser } from "./interfaces";
import { get_factory_temp_user } from "./utils";

export const STORAGE_KEY = "logged_user" as const;

const UserRepository = defineStore("UserRepository", () => {
  const persistence = reactive({
    logged_user: get_factory_temp_user(),
  });

  function set_local_storage_user(temp_user: IUser) {
    localStorage?.setItem(STORAGE_KEY, JSON.stringify(temp_user));
  }

  function set_logged_user(user: IUser) {
    set_local_storage_user(user);
    persistence.logged_user = user;
  }
  function get_logged_user(): IUser {
    return persistence.logged_user;
  }

  return { getset: { set_logged_user, get_logged_user } };
});
export class UserService {
  private persistence: ReturnType<typeof UserRepository>["getset"];

  constructor() {
    const attach = UserRepository();
    this.persistence = attach.getset;
  }

  public startApp() {
    const user_str = localStorage?.getItem(STORAGE_KEY);
    const user: IUser = user_str
      ? JSON.parse(user_str)
      : get_factory_temp_user();
    this.persistence.set_logged_user(user);

    const tab_user = this.persistence.get_logged_user();

    if (!tab_user) {
      const temp_user: IUser = get_factory_temp_user();
      this.persistence.set_logged_user(temp_user);
    }
  }

  public getTabUserInfo(): IUser {
    const temp_user = get_factory_temp_user();
    if (typeof window === "undefined" || !localStorage) return temp_user;

    const logged_user = this.persistence.get_logged_user();
    return logged_user || temp_user;
  }

  public async sign_in_user(user: IUser, options?: { goingTo?: string }) {
    const config = useRuntimeConfig();
    const url = `${config.public.BACKEND_USERS_URI}/user/`;
    try {
      const created = await $fetch<IUser>(url, {
        method: "POST",
        body: user,
      });
      console.log("~☠️ ~ UserService ~ created:", created);
      this.persistence.set_logged_user(created);
      if (options?.goingTo) {
        navigateTo(options.goingTo);
      }
      return created;
    } catch (err) {
      console.log("~☠️ ~ UserService ~ sign_in_user ~ err:", err);
    }
  }
}

