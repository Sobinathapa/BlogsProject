"use client";

import React from "react";

interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Slug</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <tr key={category.id}>
              <td className="p-2 border text-center">{category.id}</td>
              <td className="p-2 border">{category.title}</td>
              <td className="p-2 border">{category.slug}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    const confirmed = confirm("Are you sure you want to delete this category?");
                    if (confirmed) onDelete(category.id);
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="p-2 border text-center" colSpan={4}>
              No categories found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;
