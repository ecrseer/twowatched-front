import { defineStore } from "pinia";
import type { iTwaroom } from "../main/Twaroom/dtos";

export const TwaroomSingleton = defineStore("TwaroomSingleton", () => {
  const current_room = ref<null | iTwaroom>(null);

  const connected = ref(false);
  const socket = useSocket();
  const io = useIO();

  const config = useRuntimeConfig();

  function send_message_to_room(user: {
    room_id: string;
    sender_user_id: string;
    message: string;
  }) {
    const socket2 = io(config.public.BACKEND_URI);
    socket2.emit("send_message", user);
  }

  async function enter_room(user: { room_id: string; sender_user_id: string }) {
    const { room_id, sender_user_id } = user;

    try {
      const room = await $fetch<iTwaroom>(
        `${config.public.BACKEND_URI}/twaroom/${room_id}`,
        {
          method: "GET",
        }
      );
      current_room.value = room;

      const socket2 = io(config.public.BACKEND_URI);

      socket2.on("connect", () => {
        connected.value = socket2.connected;
      });

      socket2.on("disconnect", () => {
        connected.value = socket2.connected;
      });
      socket2.on("append_message", (user_message) => {
        current_room.value?.messages.push(user_message);
      });

      socket2.emit("enter_room", { room_id, sender_user_id });

      return room;
    } catch (err) {
      console.error(err);
    }
  }

  async function create_room() {
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

  return { current_room, create_room, send_message_to_room, enter_room };
});
