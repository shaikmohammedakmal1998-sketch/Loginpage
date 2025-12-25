import axios from "axios";

const api = axios.create({
  baseURL: "https://3.111.36.255:8080", // ✅ HTTPS ONLY
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ Request interceptor (attach token if available)
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("loggedUser");

    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (optional global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("loggedUser");
    }
    return Promise.reject(error);
  }
);

export default api;
