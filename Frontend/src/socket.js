// socket.js (frontend)
import { io } from "socket.io-client";

// frontend/src/socket.js
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
// const SOCKET_URL = "http://localhost:3000";
const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    withCredentials: true,
});


export default socket;
