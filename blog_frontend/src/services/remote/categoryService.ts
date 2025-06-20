import apiService from "@/lib/apiService";

const BASE_URL = "/categories";

export const getAdminCategories = async (params = {}) => {
  return await apiService.get(`${BASE_URL}/admin`, { params });
};

export const createCategory = async (payload: {
  title: string;
  description: string;
}) => {
  return await apiService.post(`${BASE_URL}`, payload);
};

export const updateCategory = async (
  id: number,
  payload: { title: string; description: string }
) => {
  return await apiService.put(`${BASE_URL}/${id}`, payload);
};

export const deleteCategory = async (id: number) => {
  return await apiService.delete(`${BASE_URL}/${id}`);
};
