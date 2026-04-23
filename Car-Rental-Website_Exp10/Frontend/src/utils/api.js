import axios from "axios";

// Access environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

console.log("API Base URL:", BASE_URL); // Debug log to check what URL is being used

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.headers['content-type']?.includes('text/html')) {
      console.error("API Error: Received HTML instead of JSON. This usually means the API URL is incorrect or the route doesn't exist.");
      console.error("Current Base URL:", BASE_URL);
      console.error("Did you forget to set VITE_BASE_URL in your Vercel project settings?");
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
