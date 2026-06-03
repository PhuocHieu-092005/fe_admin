import axios from "axios";
import {
  API_BASE_URL,
  NGROK_SKIP_BROWSER_WARNING_HEADER,
} from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: NGROK_SKIP_BROWSER_WARNING_HEADER,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Lỗi parse token:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
