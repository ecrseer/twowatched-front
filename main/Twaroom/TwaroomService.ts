import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {
    MoviesService,
    type iEnterRoleplayRoomDto,
} from "../Movies/MoviesService";
import {
    WebsocketConnectionService,
    type iWebsocket,
} from "./WebsocketConnectionService";
import {
    NotificationService,
    type iNotification,
} from "../Notifications/NotificationService";
import type {iTwaMovie} from "../Movies/interfaces";
import type {iTwamessage, iTwaroom} from "./dtos";
import {TwaroomReceiverService} from "./TwaroomReceiverService";
import {UserService} from "../User/UserService";

const TwaroomRepository = defineStore("TwaroomRepository", () => {
    const persistence = reactive({
        current_room: {} as iTwaroom,
    });
    return {persistence};
});

export class TwaroomService {
    private persistence: ReturnType<typeof TwaroomRepository>["persistence"];
    private moviesService = MoviesService();
    private userService = new UserService();
    private receiver = new TwaroomReceiverService();

    constructor() {
        const attach = TwaroomRepository();
        this.persistence = attach.persistence;
    }

    public deconstructor() {
        this.receiver.detach();
    }

    public init() {
        this.receiver.attach();
    }

    public get current_room() {
        return this.persistence.current_room;
    }

    public set current_room(room: iTwaroom) {
        this.persistence.current_room = room;
    }

    public send_roleplay_chat_request(priority: iTwaMovie) {
        const ws_connection: iWebsocket =
            WebsocketConnectionService().get_connection();

        const moviesList = this.moviesService.getMovies();
        ws_connection.emit("request_roleplay_chat", {priority, moviesList});
    }

    public async enter_roleplay_notifications_room() {
        const moviesList = this.moviesService.getMovies();
        if (!moviesList?.length) throw new Error('Cant enter notification movie room')
        const ws_connection: iWebsocket =
            WebsocketConnectionService().get_connection();
        const dto: iEnterRoleplayRoomDto = {
            moviesList,
        };
        ws_connection.emit("enter_roleplay_notifications_room", dto);
    }

    public async enter_twaroom(
        room_id: string,
        options?: { preventWebsocket?: boolean }
    ) {
        const config = useRuntimeConfig();
        try {
            const room = await $fetch<iTwaroom>(
                `${config.public.BACKEND_URI}/twaroom/by-id/${room_id}`,
                {
                    method: "GET",
                }
            );
            this.persistence.current_room = room;
            if (!options?.preventWebsocket) {
                this.enter_room_websocket();
            }
            return room;
        } catch (err) {
            console.error(err);
        }
    }

    public enter_room_websocket() {
        const ws_connection: iWebsocket =
            WebsocketConnectionService().get_connection();
        const room_id = this.persistence?.current_room?._id;
        if (room_id) {
            ws_connection.emit("enter_room", {room_id});
        }
    }

    public send_message_to_room(user_msg: iTwamessage) {
        const ws_connection: iWebsocket =
            WebsocketConnectionService().get_connection();
        const user_message: iTwamessage = {
            ...user_msg,
            sender_user_id: this.userService.getTabUserInfo()._id,
        };
        this.append_message_to_current_room(user_message);
        ws_connection.emit("send_message", user_message);
    }

    public append_message_to_current_room(message: iTwamessage) {
        this.persistence.current_room.messages.push(message);
    }
}

