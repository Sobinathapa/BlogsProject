// src/services/remote/blogService.ts
import api from "@/lib/axios";
import { Blog } from "@/types/blog";

// ✅ Get all blogs
export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await api.get("/blogs");
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  return await api.get(`/blogs/${slug}`);
};

export const deleteBlogById = (id: number) => api.delete(`/blogs/${id}`);
