import apiService from "@/lib/apiService";

export const fetchAdminBlogs = () => apiService.get("/blogs/getByAdmin");
export const fetchAdminCategories = () =>
  apiService.get("/categories/getbyadmin");
