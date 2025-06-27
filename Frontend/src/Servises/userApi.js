import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // add space here
    },
});


// ---------------------- User ----------------------
export const getUser = async () =>
    API.get("/auth/getUserProfile")
// ---------------------- APPLICATIONS ----------------------
export const ApplyJob = (data) =>
    API.post("/application/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const GetUserApplications = () =>
    API.get("/application/my-applications");

export default API;
