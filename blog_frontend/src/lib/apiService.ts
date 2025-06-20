import axios from "axios";
import { getAccessToken } from "@/utils/storageHelper";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached to request");
    } else {
      console.warn("No token found in secure storage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
