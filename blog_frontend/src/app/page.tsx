"use client";

import { useEffect, useState } from "react";
import { getAllBlogs } from "@/services/remote/blogService";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
  slug: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs({}); 
      const blogList = res?.data?.data?.blogs || res?.data?.data || [];
      setBlogs(blogList);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-2">
              {blog.content?.substring(0, 100)}...
            </p>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
