import {
  NotificationService,
  type iNotification,
} from "../Notifications/NotificationService";
import { TwaroomService } from "./TwaroomService";
import {
  WebsocketConnectionService,
  type iWebsocket,
} from "./WebsocketConnectionService";
import type { iTwamessage, iTwaroom } from "./dtos";

export class TwaroomReceiverService {
  public attach() {
    const ws_connection: iWebsocket =
      WebsocketConnectionService().get_connection();
    ws_connection.on(
      "receive_request_roleplay_chat",
      TwaroomReceiverService.on_roleplay_notification
    );
    ws_connection.on(
      "append_message",
      TwaroomReceiverService.on_append_message
    );
    ws_connection.on("disconnect", () => {
      TwaroomReceiverService.on_disconnect;
    });
  }
  public detach() {
    const ws_connection: iWebsocket =
      WebsocketConnectionService().get_connection();
    ws_connection.off("receive_request_roleplay_chat");
    ws_connection.off("append_message");
    ws_connection.off("disconnect");
  }

  private static on_disconnect() {
    new TwaroomService().enter_room_websocket();
  }

  private static async on_roleplay_notification(notification: iNotification) {
    const notify_service = new NotificationService();

    notify_service.add_fading_notification({
      ...notification,
      onAccept: TwaroomReceiverService.on_accept_roleplay,
    });
  }

  private static async on_accept_roleplay() {
    const room = await TwaroomReceiverService.create_room();
    if (room) {
      await navigateTo({ path: `/room/two/${room._id}` });
    }
  }

  private static async create_room() {
    const config = useRuntimeConfig();
    const room: Omit<iTwaroom, "_id"> = {
      name: `${new Date().toLocaleDateString()}-name`,
      media_story_id: `${new Date().toLocaleDateString()}-slime`,
      messages: [],
    };
    try {
      const data = await $fetch<{ created: iTwaroom }>(
        `${config.public.BACKEND_URI}/twaroom`,
        {
          method: "POST",
          body: room,
        }
      );

      return data.created;
    } catch (err) {
      console.error(err);
    }
  }

  private static async on_append_message(user_message: iTwamessage) {
    const roomService = new TwaroomService();
    roomService.append_message_to_current_room(user_message);
  }
}

