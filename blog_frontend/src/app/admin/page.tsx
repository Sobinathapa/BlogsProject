'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Blogs</h2>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Categories</h2>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <Link href="/admin/blogs" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Manage Blogs
        </Link>
        <Link href="/admin/categories" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Manage Categories
        </Link>
      </div>
    </div>
  );
}
