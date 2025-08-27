import axios from "axios";

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

const _refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await api.post("/auth/refresh", {
      refreshToken,
    });

    if (res.status >= 200 && res.status < 300) {
      const { accessToken } = res.data;
      if (!accessToken) {
        throw new Error("No access token in response");
      }
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    }
    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("Refresh token error:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

let _isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const _processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Handle all responses
api.interceptors.response.use(
  (response) => response,
  (error: any) => {
    console.error("API response error:", error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
