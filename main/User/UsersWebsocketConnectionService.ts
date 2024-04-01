import { defineStore } from "pinia";
import { io } from "socket.io-client";

type iInternalWebSocket = ReturnType<typeof io>;
type iWebsocketConnectionService = ReturnType<
  typeof UsersWebsocketConnectionService
>;
export type iWebsocket = ReturnType<
  iWebsocketConnectionService["get_connection"]
>;

export const UsersWebsocketConnectionService = defineStore(
  "UsersWebsocketConnectionService",
  () => {
    const configs = useRuntimeConfig();

    const ws_connection = ref<iInternalWebSocket>({} as iInternalWebSocket);

    function get_connection() {
      if (!ws_connection.value?.emit) {
        ws_connection.value = io(configs.public.BACKEND_USERS_URI);
      }
      return ws_connection.value;
    }

    return { get_connection };
  }
);

