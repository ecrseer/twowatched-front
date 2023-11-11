import { defineStore } from "pinia";
export const useTwaroomStore = defineStore("twaroomStore", () => {
  const mocking = ref("blue");

  async function create_room() {
    const room = {
      name: `${new Date().toLocaleDateString}-name`,
      media_story_id: `${new Date().toLocaleDateString}-slime`,
      messages: [],
    };
    try {
      const data = await $fetch(`${BACKEND_URI}/twaroom`, {
        method: "POST",
        body: room,
      });
      console.log("🚀 ~ create_room ~ data:", data);
    } catch (err) {
      console.error(err);
    }
  }

  return { mocking, create_room };
});

