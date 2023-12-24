import { defineStore } from "pinia";

// i need the return type of $io

export const WebsocketConnectionService = defineStore(
  "WebsocketConnectionService",
  () => {
    const configs = useRuntimeConfig();
    const { $io } = useNuxtApp();

    type iWebsocket = ReturnType<typeof $io>;
    const ws_connection = ref<iWebsocket | null>(null);
    watch(
      () => $io,
      (valid) => {
        console.log("🚀 ~ valid:", valid);
        if (valid as unknown)
          ws_connection.value = $io(configs.public.BACKEND_URI);
      }
    );
    onMounted

    return { ws_connection };
  }
);

