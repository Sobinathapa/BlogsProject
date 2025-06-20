import React from "react";

interface CategoryFormProps {
  form: { title: string; description: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form, onChange, onSubmit, isEditing }) => {
  return (
    <div className="mb-6">
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Category Title"
        className="border p-2 w-full mb-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Category Description"
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEditing ? "Update Category" : "Create Category"}
      </button>
    </div>
  );
};

export default CategoryForm;
