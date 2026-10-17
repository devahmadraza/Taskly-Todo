
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taskly-backend-sthl.onrender.com/api",
  // baseURL: "http://localhost:2001/api",
});

// 1. Attach JWT token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.dispatchEvent(new Event("authChanged"));

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;