// socket.js (frontend)
import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//     withCredentials: true,
// });
const socket = io("https://jobportal-eight-tawny.vercel.app", {
    withCredentials: true,
});

export default socket;
