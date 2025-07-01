import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // add space here
    },
});
// ---------------------- USERS ----------------------

export const getUser = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
    role = "" }) => {
    const params = { page, limit, search, sortBy, sortOrder, role };
    return API.get("/auth/getAllUsers", { params });
};

export const createUser = (data) => API.post("/auth/register", data);
export const updateUser = (id, data) => API.put(`/auth/user/${id}`, data);
export const deleteUser = (id) => API.delete(`/auth/user/${id}`);

export const updateUserProfile = (data) => API.put(`/auth/profile`, data);

// ---------------------- JOBS ----------------------

export const createJob = (data) => API.post("/admin/createJob", data);

export const getJobs = (query = "") =>
    API.get(`/admin/getAllJobs?${query}`);

export const updateJob = (id, data) =>
    API.put(`/admin/updateJob/${id}`, data);

export const deleteJob = (id) =>
    API.delete(`/admin/deleteJob/${id}`);

export const uploadJobImage = (formData) =>
    API.post("/admin/uploadJobImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });


export const getJobCategories = () => API.get("/admin/job-categories");
export const getCompanyIndustry = () => API.get("/admin/company-industry");


// ---------------------- COMPANIES ----------------------

export const createCompany = (data) => API.post("/admin/createCompany", data);

export const getCompanies = () => API.get("/admin/getAllCompanies");

export const updateCompany = (id, data) =>
    API.put(`/admin/updateCompany/${id}`, data);

export const uploadCompanyLogo = (formData) =>
    API.post("/admin/uploadCompanyLogo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

// ---------------------- APPLICATIONS ----------------------

export const getApplications = (query = "") =>
    API.get(`/admin/getApplications?${query}`);

export const createApplication = (data) =>
    API.post("/admin/createApplications", data);

export const ApplyJob = (data) =>
    API.post("/aplication/apply", data);

export const updateApplicationStatus = async (applicationId, status) => {
    API.put(`/admin/updateStatus/${applicationId}/status`, { status });
};

export const getDashboardStats = () => API.get("/admin/dashboardCount");
export const getNotigication = () => API.get('/admin/getNotigication');
export const clearNotifications = () => API.delete('/admin/clear');
export default API;
