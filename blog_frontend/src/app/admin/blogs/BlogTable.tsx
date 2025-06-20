import Link from "next/link";
import { Pencil, Trash } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category?: {
    id: number;
    title: string;
  };
}

export default function BlogTable({
  blogs = [],
  loading,
  onDelete,
}: {
  blogs: Blog[];
  loading: boolean;
  onDelete?: (id: number) => void;
}) {
  if (loading) return <p className="text-gray-600">Loading blogs...</p>;

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">#</th>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Created At</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No blogs found.
            </td>
          </tr>
        ) : (
          blogs.map((blog, index) => (
            <tr key={blog.id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.category?.title || "No Category"}</td>
              <td className="p-2 border">{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border text-center space-x-2">
                <Link href={`/admin/blogs/edit/${blog.id}`}>
                  <button className="text-blue-600 hover:underline" title="Edit">
                    <Pencil size={16} />
                  </button>
                </Link>
                <button
                  onClick={() => onDelete?.(blog.id)}
                  className="text-red-600 hover:underline"
                  title="Delete"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
