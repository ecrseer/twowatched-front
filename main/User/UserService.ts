import {defineStore} from "pinia";
import type {IUser} from "./interfaces";
import {get_factory_temp_user} from "./utils";
import {utilsAwaitUntil} from "~/utils/common";
import type {iTwaMovie} from "~/main/Movies/interfaces";
import {NotificationService} from "~/main/Notifications/NotificationService";

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

    return {getset: {set_logged_user, get_logged_user}};
});

export class UserService {
    private persistence: ReturnType<typeof UserRepository>["getset"];

    constructor() {
        const attach = UserRepository();
        this.persistence = attach.getset;
    }

    public logout() {
        this.persistence.set_logged_user(get_factory_temp_user())
    }

    public async startApp() {
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

    private async getFactoryTempUser2(){
        const config = useRuntimeConfig();
        const url = `${config.public.BACKEND_USERS_URI}/user/factory-most-viewed-movies`;
        try {
            const updated = await $fetch<IUser>(url, {
                method: "GET"
            });
            this.persistence.set_logged_user(updated);
        }catch (error) {

        }
    }

    public getTabUserInfo(): IUser {
        const temp_user = get_factory_temp_user();
        if (typeof window === "undefined" || !localStorage) return temp_user;

        const logged_user = this.persistence.get_logged_user();
        return logged_user || temp_user;
    }

    public setTabUserInfo(user: IUser) {
        this.persistence.set_logged_user(user);
    }

    public is_real_user(user: IUser) {
        const REAL_USER_ID_MODEL = 'X609e7cxf6baXb0feX7d7X1a'
        return user._id?.length === REAL_USER_ID_MODEL?.length
    }

    public async tryGetRealUser() {
        const real = await utilsAwaitUntil(() => this.is_real_user(this.getTabUserInfo()), {maxTries: 7});
        if (real) return this.getTabUserInfo();
        return null;
    }

    public async edit_user(user: IUser) {
        const config = useRuntimeConfig();
        const url = `${config.public.BACKEND_USERS_URI}/user/`;
        try {
            const updated = await $fetch<IUser>(url, {
                method: "PATCH",
                body: user,
            });
            this.persistence.set_logged_user(updated);

            const notify_service = new NotificationService();

            notify_service.add_fading_notification(
                {
                    title: "User updated",
                    description: `Seu usuário foi alterado com sucesso!`,
                },
                "bottom"
            );

            return updated;
        } catch (err) {
            console.error(err);
        }
    }

    public async sign_in_user(user: IUser, options?: { goingTo?: string }) {
        const config = useRuntimeConfig();
        const url = `${config.public.BACKEND_USERS_URI}/user/`;
        try {
            const created = await $fetch<IUser>(url, {
                method: "POST",
                body: user,
            });
            this.persistence.set_logged_user(created);
            if (options?.goingTo) {
                navigateTo(options.goingTo);
            }
            return created;
        } catch (err) {
            console.log("~☠️ ~ UserService ~ sign_in_user ~ err:", err);
        }
    }

    public async login_user(user: Partial<IUser>, options?: { goingTo?: string }) {
        const notify_service = new NotificationService();
        const config = useRuntimeConfig();
        const url = `${config.public.BACKEND_USERS_URI}/user/login`;
        try {
            const found = await $fetch<IUser>(url, {
                method: "POST",
                body: user,
            });
            this.persistence.set_logged_user(found);
            if (options?.goingTo) {
                navigateTo(options.goingTo);
            }

            notify_service.add_fading_notification(
                {
                    title: "User logged in",
                    description: `Bem vindo de volta, ${found.name}!`,
                },
                "bottom"
            );
            return found;
        } catch (err) {
            notify_service.add_fading_notification(
                {
                    title: "User logged in",
                    description: `Email ou senha incorretas!`,
                    type: 'error'
                },
                "bottom"
            );
        }
    }

    public async add_movies_to_current_user(movies: iTwaMovie[]) {

        let user = this.getTabUserInfo();
        const moviesIds = movies.map(m => m._id) as string[]
        user.moviesList.push(...moviesIds);
        this.setTabUserInfo(user);


        if (this.is_real_user(user)) {
            return this.save_movies_on_user(user);
        }
        return user;
    }

    private async save_movies_on_user(user: IUser) {
        const config = useRuntimeConfig();
        const url = `${config.public.BACKEND_USERS_URI}/user/save-movies`;
        const created = await $fetch<IUser>(url, {
            method: "PATCH",
            body: user,
        });
        return created;
    }

    public async find_movies_count_from_user() {
        const config = useRuntimeConfig();
        let user = await this.tryGetRealUser();
        if (!user) {
            user = this.getTabUserInfo();
        }

        const url = `${config.public.BACKEND_URI}/twaroom/count-roleplays-by-user-id/${user._id}`;
        const counted_movies = await $fetch<any>(url, {
            method: "GET",
        });
        return counted_movies;
    }


}

