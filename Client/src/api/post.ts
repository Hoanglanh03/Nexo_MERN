import api from "./api";
import { IPost } from "@/types";

export const createPost = (data: IPost) =>
  api.post("/posts/", data, {
    headers: {
      "Content-Type": data ? "multipart/form-data" : "application/json",
    },
  });

export const getAllPosts = () => api.get("/posts/");

export const handleLike = (postId: string) => {
  return api.post(`/posts/${postId}/like`);
};
