"use client";
import { AdminFooter } from "@/components/admin/footer";
import { AdminNavBar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";
import AuthProvider from "@/providers/AuthProvider";
import React, { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AuthProvider>
      <div className="flex min-h-screen relative max-h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar isOpen={isOpen} onToggle={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Navbar with toggle button for mobile */}
          <AdminNavBar onToggle={toggleSidebar} />

          {/* Page content */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
            {children}
          </main>

          {/* Footer */}
          <AdminFooter />
        </div>
      </div>
    </AuthProvider>
  );
}
