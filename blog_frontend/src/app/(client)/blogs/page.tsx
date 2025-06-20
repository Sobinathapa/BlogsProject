'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBlogs } from '@/services/remote/blogService';
import { Blog } from '@/types/blog';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];
        setBlogs(data);
      } catch (err) {
        console.error('Error loading blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div className="p-4">Loading blogs...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <>
          {currentBlogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id}>
              <div className="border p-4 rounded mb-4 shadow bg-white hover:bg-gray-50 cursor-pointer">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {blog.content ? blog.content.slice(0, 100) + '...' : 'No content available...'}
                </p>
              </div>
            </Link>
          ))}

          {/* Pagination controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 font-medium">{currentPage}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
