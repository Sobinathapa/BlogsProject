"use client";

import { useEffect, useState } from "react";
import {
  getAdminCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/remote/categoryService";
import toast from "react-hot-toast";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
}

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await getAdminCategories();
      setCategories(res.data.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Both fields are required");
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, form);
        toast.success("Category updated successfully");
      } else {
        await createCategory(form);
        toast.success("Category created successfully");
      }
      setForm({ title: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      toast.error(editingId ? "Update failed" : "Create failed");
      console.error("Save error:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setForm({ title: category.title, description: category.description });
    setEditingId(category.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      <CategoryForm
        form={form}
        onChange={handleChange}
        onSubmit={handleCreateOrUpdate}
        isEditing={!!editingId}
      />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminCategoryPage;
