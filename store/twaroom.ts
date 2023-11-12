import { defineStore } from "pinia";
export const useTwaroomStore = defineStore("twaroomStore", () => {
  const mocking = ref("blue");

  const connected = ref(false);
  const socket = useSocket();
  const io = useIO();

  const config = useRuntimeConfig();
  function test_connection() {
    const socket2 = io(config.public.BACKEND_URI);
    console.log("🚀 ~ onMounted ~ socket2:", socket2);
    socket2.on("connect", () => {
      connected.value = socket2.connected;
    });

    socket2.on("disconnect", () => {
      connected.value = socket2.connected;
    });
    socket2.on("message", (abc) => {
      console.log("🚀 ~ socket2.on ~ abc:", abc);
    });
    socket2.emit("message", { abc: "123" }, (data) => {
      console.log("🚀 ~ socket2.emit ~ data:", data);
    });
  }

  async function create_room() {
    const room = {
      name: `${new Date().toLocaleDateString}-name`,
      media_story_id: `${new Date().toLocaleDateString}-slime`,
      messages: [],
    };
    try {
      const data = await $fetch(`${config.public.BACKEND_URI}/twaroom`, {
        method: "POST",
        body: room,
      });
      console.log("🚀 ~ create_room ~ data:", data);
    } catch (err) {
      console.error(err);
    }
  }

  return { mocking, create_room, test_connection };
});

