"use client";
import { User } from "@/types";
import { getLoggedInUser, removeSecureItem } from "@/utils/storageHelper";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const localUser = getLoggedInUser();

        if (localUser) {
          if (localUser.role.title.toLowerCase() !== "admin") {
            throw new Error("Unauthorized");
          }

          setUser(localUser);
        } else {
          throw new Error("User not found");
        }
      } catch (error: any) {
        console.log(error);
        removeSecureItem("user");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};