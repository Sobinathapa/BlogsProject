"use client";

import { useAuth } from "@/providers/AuthProvider";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import useLogout from "@/hooks/auth/useLogout";

export default function AdminNavBar({ onToggle }: { onToggle?: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { handleLogout } = useLogout(); // ✅ import logout logic

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b">
      <div className="flex items-center justify-between py-4">
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden mx-4 p-2 rounded-md shadow cursor-pointer hover:bg-gray-100/20 transition-all duration-300"
          onClick={onToggle}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold hidden lg:block">Admin Panel</h1>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 py-2 px-4 mx-4 cursor-pointer transition-colors hover:bg-slate-500/20 rounded-full"
            onClick={toggleDropdown}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500" />
            <span className="hidden md:block">{user?.fullName}</span>
            <IoIosArrowDown className="text-xl" />
          </div>

          {isDropdownOpen && (
            <div className="absolute mt-2 w-48 rounded-lg shadow-lg py-2 z-50 bg-white dark:bg-slate-700">
              <div className="px-4 py-2 mb-2 text-sm border-b">
                Welcome, {user?.fullName.split(" ")[0]}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100/10 cursor-pointer"
              >
                <IoLogOut className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
