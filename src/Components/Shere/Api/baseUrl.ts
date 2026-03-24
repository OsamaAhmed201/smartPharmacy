import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseIMG = import.meta.env.VITE_BASE_IMG;

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor (إضافة التوكن تلقائيًا)
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
export const USERS_URLS = {
  LOGIN: `/auth/login`,
  SIGNUP: `/auth/signup`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  VERIFY_RESET_CODE: `/auth/verify-reset-code`,
  RESET_PASSWORD: `/auth/reset-password`,
};