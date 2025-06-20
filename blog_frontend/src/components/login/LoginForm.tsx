"use client";

import useLogin from "@/hooks/auth/useLogin";
import React from "react";
import { FaLock } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm() {
  const { handleSubmit, handleFieldChange, isLoading } = useLogin();

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gray-100 dark:bg-neutral-800 border border-gray-400 dark:border-neutral-600 rounded-2xl shadow-2xl transition-colors duration-300">
      {/* Icon */}
      <div className="flex items-center justify-center mb-5">
        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
          <FaLock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please sign in to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={handleFieldChange}
            autoComplete="email"
            className="w-full p-3 rounded-lg bg-white dark:bg-neutral-700 border border-gray-400 dark:border-neutral-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field + Forgot Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleFieldChange}
            autoComplete="current-password"
            className="w-full p-3 rounded-lg bg-white dark:bg-neutral-700 border border-gray-400 dark:border-neutral-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
        © {new Date().getFullYear()} YourAppName. All rights reserved.
      </p>
    </div>
  );
}
