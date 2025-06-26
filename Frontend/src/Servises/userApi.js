import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
});

// Add token automatically to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ---------------------- APPLICATIONS ----------------------
export const ApplyJob = (data) =>
    API.post("/application/apply", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const GetUserApplications = () =>
    API.get("/application/my-applications");

export default API;
