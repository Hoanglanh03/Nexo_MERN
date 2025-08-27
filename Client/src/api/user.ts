import api from "./api";

// Update tên user
export const updateUserName = (id: string, fullName: string) =>
  api.put(`/users/${id}`, { fullName });

// Lấy thông tin user
export const getUserProfile = (id: string) => api.get(`/users/${id}`);
