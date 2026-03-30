import axios from "axios";

let authToken = "";
let logoutHandler = () => {
  window.location.href = "/login"; // Fallback
};

export const setAxiosAuthToken = (token) => {
  authToken = token;
};
export const injectLogoutHandler = (handler) => {
  logoutHandler = handler;
};
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // Get token from your state manager (e.g., Redux store)
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. ACCESS TOKEN EXPIRED (401 Unauthorized)
    // We try to silently refresh the token once.
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/user/refresh-token")
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.get("/user/refresh-token", {
          withCredentials: true,
        });
        const newAccessToken = response.data.accessToken;
        setAxiosAuthToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logoutHandler();
        return Promise.reject(refreshError);
      }
    }

    // 2. REFRESH TOKEN EXPIRED / INVALID SESSION (403 Forbidden)
    // If the backend returns 403, the session is dead.
    if (error.response.status === 403) {
      // Clear your context/state here if possible, then redirect
      logoutHandler();
      return Promise.reject(error);
    }

    // 3. IGNORE 404
    // Do nothing for 404; let the component handle the "Not Found" error.

    return Promise.reject(error);
  },
);
export default axiosInstance;
