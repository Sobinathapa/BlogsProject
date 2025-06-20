"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { TbCategory2 } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <FiHome size={20} />,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: <TbCategory2 size={20} />,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: <FaBlog size={20} />,
  },
];

export default function AdminSidebar({
  isOpen,
  onToggle,
}: {
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`bg-white dark:bg-slate-700 m-2 rounded-xl
        fixed lg:static z-50 h-[calc(100vh-1rem)] lg:h-auto
        w-64 shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-100 lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Admin Panel</h2>

            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={onToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:block w-full border-t-2 simple-border mt-5" />

          <nav className="mt-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow"
                            : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-white"
                        }
                      `}
                      onClick={onToggle}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}