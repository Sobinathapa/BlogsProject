'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBlogBySlug } from '@/services/remote/blogService';
import { Blog } from '@/types/blog';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlug(slug);
        setBlog(res?.data?.data); 
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="p-6 text-gray-500">Loading blog...</p>;
  if (!blog) return <p className="p-6 text-red-600">Blog not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.featuredImage && (
        <img
          src={`http://localhost:8000/uploads/blogs/${blog.featuredImage}`}
          alt={blog.title}
          className="mb-6 w-full rounded-xl shadow"
        />
      )}

      <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
        {blog.content}
      </div>
    </div>
  );
}
