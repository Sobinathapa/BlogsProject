"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getSingleAdminBlog,
  updateAdminBlog,
} from "@/services/remote/adminBlogService";
import { getAdminCategories } from "@/services/remote/categoryService";
import toast from "react-hot-toast";

interface Category {
  id: number;
  title: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id ? Number(params.id) : null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!blogId) return;

      try {
        const [catRes, blogRes] = await Promise.all([
          getAdminCategories(),
          getSingleAdminBlog(blogId),
        ]);

        setCategories(catRes.data.data?.data || []);


        const blog = blogRes.data.data;
        setTitle(blog.title);
        setContent(blog.content);
        setCategoryId(blog.categoryId); 
      } catch (err) {
        toast.error("Failed to load blog or categories");
      }
    };

    fetchData();
  }, [blogId]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim() || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    try {
      await updateAdminBlog(blogId!, { title, content, categoryId });
      toast.success("Blog updated");
      router.push("/admin/blogs");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

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
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
}
