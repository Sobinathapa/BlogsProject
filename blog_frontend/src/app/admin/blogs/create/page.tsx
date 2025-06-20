"use client";

import { useState, useEffect } from "react";
import { createAdminBlog } from "@/services/remote/adminBlogService";
import { getAdminCategories } from "@/services/remote/categoryService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Category {
  id: number;
  title: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAdminCategories();
        setCategories(res.data.data.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    try {
      await createAdminBlog({ title, content, categoryId });
      toast.success("Blog created");
      router.push("/admin/blogs");
    } catch (err) {
      toast.error("Creation failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>

      <div className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Blog title"
          className="w-full border rounded px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog content"
          className="w-full border rounded px-4 py-2 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="w-full border rounded px-4 py-2"
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Blog
        </button>
      </div>
    </div>
  );
}
