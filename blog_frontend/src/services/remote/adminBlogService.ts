import api from "@/lib/apiService";

export const createAdminBlog = (data: {
  title: string;
  content: string;
  categoryId: number;
}) => api.post("/blogs", data);

export const updateAdminBlog = (
  id: number,
  data: { title: string; content: string; categoryId: number }
) => api.put(`/blogs/${id}`, data);

export const deleteAdminBlog = (id: number) => api.delete(`/blogs/${id}`);

export const getSingleAdminBlog = (id: number) => api.get(`/blogs/admin/${id}`);

export const getAllAdminBlogs = () => api.get("/blogs/admin");
