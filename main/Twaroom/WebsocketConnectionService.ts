import { defineStore } from "pinia";

export const WebsocketConnectionService = defineStore(
  "WebsocketConnectionService",
  () => {
    const { $io } = useNuxtApp();
    const configs = useRuntimeConfig();

    type iWebsocket = ReturnType<typeof $io>;
    const ws_connection = ref<iWebsocket>({} as iWebsocket);

    function get_connection() {
      if (!ws_connection.value?.emit) {
        ws_connection.value = $io(configs.public.BACKEND_URI);
      }
      return ws_connection.value;
    }

    return { get_connection };
  }
);

