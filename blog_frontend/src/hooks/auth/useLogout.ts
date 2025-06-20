"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeSecureItem } from "@/utils/storageHelper";
import toast from "react-hot-toast";

const useLogout = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      removeSecureItem("accessToken");
      removeSecureItem("refreshToken");
      removeSecureItem("user");

      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
};

export default useLogout;
