import { io } from "socket.io-client";
import { APIRoutes } from "./APIRoutes";

export const socket = io(APIRoutes.HOST, {
  transports: ["websocket", "polling", "flashsocket"],
  withCredentials: true,
});
