import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || "";
    if (error?.response?.status === 401 && message.toLowerCase().includes("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const registerStudent = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);

export const submitComplaint = (payload) => api.post("/complaints", payload);
export const getMyComplaints = () => api.get("/complaints/my");

export const getAllComplaints = (filters = {}) => api.get("/complaints", { params: filters });
export const updateComplaintStatus = (id, status) =>
  api.put(`/complaints/${id}/status`, { status });

export default api;
