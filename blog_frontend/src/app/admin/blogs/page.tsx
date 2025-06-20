"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getAllAdminBlogs, deleteAdminBlog } from "@/services/remote/adminBlogService";

interface Blog {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  
}

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await getAllAdminBlogs();
      console.log("✅ Admin blogs fetched:", res.data.data.data);
      setBlogs(res.data.data.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteAdminBlog(id);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <button
          onClick={() => router.push("/admin/blogs/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Blog
        </button>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Slug</th> {/* Changed from Category to Slug */}
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <tr key={blog.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.slug}</td> {/* Show slug here */}
                <td className="border px-4 py-2">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
